# Version
cat("NIST Validation & Verification R Script Version 1.4 \r\n")


#load and install packages
is.installed <- function(mypkg) is.element(mypkg, installed.packages()[,1])

maxTry <- 2

for (packageName in c("truncnorm","triangle","nleqslv","mvtnorm","numDeriv","parallel","evd","sn"))
{
    cnt = 1
	while(!is.installed(packageName))
	{
	print(packageName)
	if(cnt>maxTry) break
	install.packages(packageName,repos="http://lib.stat.cmu.edu/R/CRAN")
	cnt <- cnt+1
	}
}

require(methods)
truncnormL = require(truncnorm)
triangleL = require(triangle)
nleqslvL = require(nleqslv)
mvtnormL = require(mvtnorm)
numDerivL = require(numDeriv)
parallelL = require(parallel)
require(evd)
require(sn)
parallelL2 = exists("mcparallel")

if(parallelL)
{
	nCores = detectCores()
	if(nCores < 4)
	{
		parallelL = FALSE
		parallelL2 = FALSE
	}
}


#Asymmetric function

asymmetricalModelSelection = function (x, uL, uR, p, wL=4, wM=1, wR=4,
                                       forceGEV=FALSE)
{


    fSkewNormal = function (xoa, xL, xM, xR, pL=0.025, pM=0.5, pR=0.975,
                            wL=wL, wM=wM, wR=wR)
    {
        xi = xoa[1]; omega = xoa[2]; alpha = xoa[3]
        return(wL*(qsn(pL, xi=xi, omega=omega, alpha=alpha,
                       solver="RFB") - xL)^2 +
                  wM*(qsn(pM, xi=xi, omega=omega, alpha=alpha,
                          solver="RFB") - xM)^2 +
                     wR*(qsn(pR, xi=xi, omega=omega, alpha=alpha,
                             solver="RFB") - xR)^2)
    }

    fGEV = function (msx, xL, xM, xR, pL=0.025, pM=0.5, pR=0.975,
                     wL=wL, wM=wM, wR=wR, tol=sqrt(.Machine$double.eps))
    {
        mu = msx[1]; sigma = msx[2]; xi = msx[3]
        if (sigma < tol) {return(Inf)
        } else {
            return(
                wL*(qgev(pL, loc=mu, scale=sigma, shape=xi) - xL)^2 +
                wM*(qgev(pM, loc=mu, scale=sigma, shape=xi) - xM)^2 +
                wR*(qgev(pR, loc=mu, scale=sigma, shape=xi) - xR)^2) }
    }

    if (forceGEV) {
        modelSelection = "GEV"
        cat("Selected GEV Model\n")
        theta.start = c(x, sqrt(uL*uR), if (uR > uL) {0.25} else {-0.25})
        theta.optim = try(optim(par=theta.start, fn=fGEV, method="Nelder-Mead",
                                xL=x-uL, xM=x, xR=x+uR,
                                pL=(1-p)/2, pM=0.5, pR=(1+p)/2,
                                wL=wL, wM=wM, wR=wR))
        if (class(theta.optim) == "try-error") {
            cat(paste("ERROR (asymmetricalModelSelection):",
                      "unable to reproduce uL and uR\n"))
            theta = NULL
        } else {
            x.mu = theta.optim$par[1]
            x.sigma = theta.optim$par[2]
            x.xi = theta.optim$par[3]
            theta = c(mu=x.mu, sigma=x.sigma, xi=x.xi) }
        return(list(modelSelection=modelSelection,
                    modelParameters=theta))
    }

    centralSkew = uR/uL

    ## Can skew normal distribution model this central skewness?
    alphaVALUEs = seq(from=-20, to=20, by=0.1)
    na = length(alphaVALUEs)
    centralSkew.SN = numeric(na)
    for (ja in 1:na)
    {
        alpha = alphaVALUEs[ja]
        delta = alpha/sqrt(1+alpha^2)
        MLU = qsn(c(0.5, (1-p)/2, 1-(1-p)/2), alpha=alpha, solver="RFB")
        centralSkew.SN[ja] = ((MLU[3]-MLU[1])/(MLU[1]-MLU[2]))
    }

    if ((centralSkew > min(centralSkew.SN)) &
        (centralSkew < max(centralSkew.SN)))
    {
        ## Use SN model
        modelSelection = "SN"
        cat("Selected SN Model\n")
        theta.start = c(x, sqrt(uL*uR), 0)
        theta.optim = try(optim(par=theta.start, fn=fSkewNormal,
                                method="Nelder-Mead",
                                xL=x-uL, xM=x, xR=x+uR,
                                pL=(1-p)/2, pM=0.5, pR=(1+p)/2,
                                wL=wL, wM=wM, wR=wR))
        if (class(theta.optim) == "try-error") {
            cat(paste("ERROR (asymmetricalModelSelection):",
                      "unable to reproduce uL and uR\n"))
            theta = NULL
        } else {
            x.xi = theta.optim$par[1]
            x.omega = theta.optim$par[2]
            x.alpha = theta.optim$par[3]
            theta = c(xi=x.xi, omega=x.omega, alpha=x.alpha) }
    } else {
        ## Use GEV model
        modelSelection = "GEV"
        cat("Selected GEV Model\n")
        theta.start = c(x, sqrt(uL*uR), if (uR > uL) {0.25} else {-0.25})
        theta.optim = try(optim(par=theta.start, fn=fGEV, method="Nelder-Mead",
                                xL=x-uL, xM=x, xR=x+uR,
                                pL=(1-p)/2, pM=0.5, pR=(1+p)/2,
                                wL=wL, wM=wM, wR=wR))
        if (class(theta.optim) == "try-error") {
            cat(paste("ERROR (asymmetricalModelSelection):",
                      "unable to reproduce uL and uR\n"))
            theta = NULL
        } else {
            x.mu = theta.optim$par[1]
            x.sigma = theta.optim$par[2]
            x.xi = theta.optim$par[3]
            theta = c(mu=x.mu, sigma=x.sigma, xi=x.xi) }
    }
    return(list(modelSelection=modelSelection,
                modelParameters=theta))
}

asymmetricalModelSample = function (K, modelSpecification)
{
    if (modelSpecification$modelSelection=="SN") {
        theta = modelSpecification$modelParameters
        x.xi = theta["xi"]
        x.omega = theta["omega"]
        x.alpha = theta["alpha"]
        xBOOT = rsn(K, xi=x.xi, omega=x.omega, alpha=x.alpha, tau=0)
    } else {
        if (modelSpecification$modelSelection=="GEV") {
            theta = modelSpecification$modelParameters
            x.mu = theta["mu"]
            x.sigma = theta["sigma"]
            x.xi = theta["xi"]
            xBOOT = rgev(K, loc=x.mu, scale=x.sigma, shape=x.xi)
        } else {
            xBOOT = NULL
            cat(paste("ERROR (asymmetricalModelSample):",
                      "Incorrect modelSpecification\n")) } }
    return(xBOOT)
}

asymmetricalModelQuantiles = function (p, modelSpecification)
{
    if (modelSpecification$modelSelection=="SN") {
        theta = modelSpecification$modelParameters
        x.xi = theta["xi"]
        x.omega = theta["omega"]
        x.alpha = theta["alpha"]
        xBOOT = qsn(p, xi=x.xi, omega=x.omega, alpha=x.alpha, solver="RFB")
    } else {
        if (modelSpecification$modelSelection=="GEV") {
            theta = modelSpecification$modelParameters
            x.mu = theta["mu"]
            x.sigma = theta["sigma"]
            x.xi = theta["xi"]
            xBOOT = qgev(p, loc=x.mu, scale=x.sigma, shape=x.xi)
        } else {
            xBOOT = NULL
            cat(paste("ERROR (asymmetricalModelQuantiles):",
                      "Incorrect modelSpecification\n")) } }
    return(xBOOT)
}


#UncertaintyMachine functions
signifDigits = function (x, y)
{
	n = 1
	if(x==y)
		return(Inf)
	while (signif(x, n) == signif(y, n)) {n = n + 1}
	return(n-1)
}

deviceType=NULL
if(!is.null(getOption("bitmapType")) && capabilities("cairo"))
	deviceType = "cairo"

errorStop = function (errorString = "Error", errorFile = NULL)
{
	if(!is.null(errorFile))
		write(errorString, file = errorFile, append = FALSE)
	stop(errorString,call.=FALSE)
}

gummer = function (f, x, u, r=diag(length(u)), ...)
{
	g=NA
	try(g <- grad(f, x, ...))
	if(any(is.na(g)))
	{
		cat(paste("Complex gradient in use\n"))
		try(g <- grad(f, x,,method = "complex" ,...))
	}
	y = f(x, ...)
	uy = sqrt(matrix(g, nrow=1) %*% (outer(u,u,"*")*r) %*% matrix(g, ncol=1))
	return(c(y, uy))
}

# Golden search for computation of centered coverage intervals
symmetricalCI = function (x, estimate, coverage)
{
	m = length(x)
	Umax = max(abs(x - estimate))
	Udelta = (max(x)-min(x))/m
	x1 = Umax
	x0 = 0
	iteration = 1
	while(iteration<10000000 && (x1-x0)>Udelta)
	{
		iteration = iteration+1
		x3 = (x1 +x0) /2
		if(sum((estimate-x3 <= x) &(x <= estimate+x3))/m < coverage)
		{
			x0 = x3
		}else
		{
			x1 = x3
		}
	}
	return((x1 +x0) /2 )
}

# SUBSAMPLING for significant digit evaluation
significator = function (y, nsubsamples=1000, stat=mean, k=1, digits=FALSE, ...)
{
	nz = nsubsamples
	ny = length(y)
	mz = trunc(ny/nz)
	z = array(y, dim=c(mz,nz))
	zs = apply(z, 2, stat,...)
	sigma = mad(zs)/sqrt(ny/nz)
	ys = stat(y, ...)
	stat.signif = floor(log10(abs(ys/(k*sigma))))

	ys.signif = signif(ys, stat.signif)
	names(ys.signif) = NULL
	if(digits)
	{
		res <- list()
		res$value = ys.signif
		res$digits = stat.signif
		return(res)
	}
	return(ys.signif)
}

# distrib
distrib = function(nbVar,nbReal,varNames,expression,type,parameters,symmetrical,correlation,outputFile,copulaType=NULL,copulaDf=NULL,pretreatment=NA)
{
	# cat("nbVar = ",nbVar,"\n")
	# cat("nbReal = ",nbReal,"\n")
	# cat("expre = ",expression,"\n")
	# cat("type = ",type,"\n")
	# cat("parameters = \n")
	# print(parameters)
	# cat("correlation = \n")
	# print(correlation)
	# cat("outputFile = ",outputFile,"\n")
	# cat("pretreatment = ",pretreatment,"\n")

	cat(paste("expression: " , expression,"pretreatment: " , pretreatment,"outputFile: " , outputFile,"symmetrical: " , symmetrical,"\n"))

	if(outputFile!="no-output")
	{
		tempout=unlist(strsplit(outputFile,split="\\."))
		if (tempout[length(tempout)]!="txt")
			outputFile=paste(outputFile,"txt",sep=".")
		tempout=unlist(strsplit(outputFile,split="\\."))
		tempout2=tempout[1]
		if(length(tempout)>2)
			for(iu in 2:(length(tempout)-1))
				tempout2=paste(tempout2,tempout[iu],sep=".")
		outputFile =paste(tempout2,"-values.Rd",sep="")
		outputFile2=paste(tempout2,"-results.txt",sep="")
		outputFile3=paste(tempout2,"-density.jpg",sep="")
		if(file.exists(outputFile))
			file.remove(outputFile)
		if(file.exists(outputFile2))
			file.remove(outputFile2)
		if(file.exists(outputFile3))
			file.remove(outputFile3)
	}
	##Selection of the error file NULL local outputFile2 for web version
	errorFile=outputFile2

	## Verification that all the packages were loaded successfully

	if (!truncnormL)
		errorStop("Impossible to load the package truncnorm",errorFile)
	if (!triangleL)
		errorStop("Impossible to load the package triangle",errorFile)
	if (!nleqslvL)
		errorStop("Impossible to load the package nleqslv",errorFile)
	if (!mvtnormL)
		errorStop("Impossible to load the package mvtnorm",errorFile)
	if (!numDerivL)
		errorStop("Impossible to load the package numDeriv",errorFile)

	## (COMP-03) Verify that the user has specified a positive
	## integer (m) for the size of the Monte Carlo sample.
	if(nbReal<0)
		errorStop("Negative number or realizations\n",errorFile)


	if(nbReal<100000)
		errorStop("The number of realizations should be greater than 100000\n",errorFile)

	## (COMP-04) If correlations are given, verify that the resulting
	## correlation matrix has all eigenvalues positive.
	if(!is.logical(correlation))
	{
		if (min(eigen(correlation, symmetric=TRUE, only.values=TRUE)$values) < sqrt(.Machine$double.eps))
			errorStop("Illegal correlation matrix\n",errorFile)
		if(copulaType=="Student" && copulaDf<3)
			errorStop("The number of degree of freedom of the copula should be greater than 3\n",errorFile)
	}

	##Parameters are valid so the computation continues

	if(symmetrical == TRUE)
	{
		quantileY = matrix(rep(NA,4),ncol=4)
	}
	else
	{
		quantileY = quantile(0, probs=c(0.005, 0.025, 0.05,
						pnorm(-1), pnorm(1), 0.95, 0.975, 0.995))
	}
	sdX = numeric(nbVar)
	meanX = numeric(nbVar)

	##Safe Environment
	safe_f <- c(
			getGroupMembers("Math"),
			getGroupMembers("Arith"),
			getGroupMembers("Compare"),
			"<-","{","(","[","=","pi","complex","Re","Im","Mod","Arg","c","function","$","mapply",
			"matrix","%*%","pmin","pmax"
	)

	varEnv <- new.env(parent = emptyenv())

	for (f in safe_f) {
		varEnv[[f]] <- get(f, "package:base")
	}
	varEnv[["uniroot"]] <- get("uniroot")
	varEnv[["t"]] <- get("t.default")
	varEnv[["solve"]] <- get("solve.default")

	if(is.logical(correlation))
	{
		for(ii in 1:nbVar)
		{
			res = drawDistrib(type,parameters,varNames,varEnv,errorFile,ii)
			meanX[ii]=res$meanX
			sdX[ii]=res$sdX

		}
	}else
	{

		if(copulaType=="Gaussian")
		{
			z = rmvnorm(nbReal, mean=rep(0, nbVar), sigma=correlation)
			z = pnorm(z)
		}else
		{
			z = rmvt(nbReal, sigma=correlation, df=copulaDf)
			z = pt(z, df=copulaDf)
		}


		for(ii in 1:nbVar)
		{
			res = drawDistribCorel(type,parameters,varNames,z,varEnv,errorFile,ii)
			meanX[ii]=res$meanX
			sdX[ii]=res$sdX
		}

	}
	y=NULL
	timeOut = 300
	if(!is.na(pretreatment))
	{
		setTimeLimit(timeOut, timeOut)
		res1<-try(eval(parse(text=pretreatment),envir = varEnv),silent = TRUE)
		setTimeLimit(Inf, Inf)
		if(class(res1) == "try-error")
			errorStop(paste("Impossible to evaluate the output expression \n",strsplit(res1,":")[[1]][2], "\n"), errorFile)
	}
	setTimeLimit(timeOut, timeOut)
	res2<-try(eval(parse(text=paste( "y =",expression,sep="")),envir = varEnv),silent = TRUE)
	setTimeLimit(Inf, Inf)
	if(class(res2) == "try-error")
		errorStop(paste("Error in the evaluation of the output expression:" ,expression, "\n",strsplit(res2,":")[[1]][2], "\n"), errorFile)

	y = varEnv$y

	for(ii in 1:nbVar)
	{
		eval(parse(text=paste(varNames[ii], "=varEnv$",varNames[ii],sep="")))
	}

	if(class(y)!="numeric")
		errorStop("Ouput quantity is not of type: numeric\nPlease check its definition", errorFile)
	if(any(is.na(y)))
		errorStop("NaNs produced in the ouput quantities\nPlease check its definition", errorFile)
	if(any(y==Inf))
		errorStop("Inf values produced in the ouput quantities\nPlease check its definition", errorFile)
	if(all(y==y[1]))
		errorStop("This application does not support a constant output quantity", errorFile)



	if(outputFile!="no-output")
	{
		if(is.null(deviceType))
			jpeg(file=outputFile3, width=5, height=4, units="in",
					res=600, quality=100, pointsize=10, bg="white")
		else
			jpeg(file=outputFile3, width=5, height=4, units="in",
					res=600, quality=100, pointsize=10, bg="white",type=deviceType)
		par(mar=c(4.5, 4.5, 0.5, 0.75))

		if(parallelL2)
			mcparallel(
				{
				  plot(density(y, from=mean(y)-3*sd(y), to=mean(y)+3*sd(y)), bty="n",
				       col="Blue", main="",
				       xlab="", ylab="Probability Density")
				  curve(dnorm(x, mean=mean(y), sd=sd(y)), lty=3, lwd=2, col="Red", from=mean(y)-3*sd(y), to=mean(y)+3*sd(y), add=TRUE)
				  mtext("Output quantity (Y)          ", side=1, line=2,adj = 1)
				  legend("bottomleft",inset =c(-0.17,- 0.20) , c("Monte Carlo sample drawn from distribution of output quantity","Gaussian distribution with same mean and standard deviation as Monte Carlo sample"), col = c("blue","red"), lty = c(1,3),cex = 0.55,xpd = TRUE)
				  dev.off()

				})
		else
		{
		  plot(density(y, from=mean(y)-3*sd(y), to=mean(y)+3*sd(y)), bty="n",
		       col="Blue", main="",
		       xlab="", ylab="Probability Density")
		  curve(dnorm(x, mean=mean(y), sd=sd(y)), lty=3, lwd=2, col="Red", from=mean(y)-3*sd(y), to=mean(y)+3*sd(y), add=TRUE)
		  mtext("Output quantity (Y)          ", side=1, line=2,adj = 1)
			legend("bottomleft",inset =c(-0.17,- 0.20) , c("Monte Carlo sample drawn from distribution of output quantity","Gaussian distribution with same mean and standard deviation as Monte Carlo sample"), col = c("blue","red"), lty = c(1,3),cex = 0.55,xpd = TRUE)
		  dev.off()
		}
		cat("\nY values being saved in file:  ",outputFile,"\n")
		cat("Results being saved in file:   ",outputFile2,"\n")
		cat("Y Density being saved in file: ",outputFile3,"\n")
	}
	nSample = min(c(5e5, nbReal))
	iz = sample(1:nbReal, size=nSample, replace=FALSE)

	sub = list()
	for (ji in 1:nbVar) {sub[[ji]] =get(varNames[ji],envir=varEnv)[iz]}
	sub[[nbVar+1]] = y[iz]
	names(sub) = c(varNames, "y")
	sub = as.data.frame(sub)

	aov.formula = as.formula(paste("y", "~",paste(varNames, collapse="+"), sep=""))
	if(parallelL2)
		s = mcparallel(summary(aov(aov.formula, data=sub)))
	else
		s = summary(aov(aov.formula, data=sub))


	meanY=mean(y)
	sdY=sd(y)
	if(parallelL2)
	{
		yAve = mcparallel(significator(y, stat=mean, digits=TRUE))
		ySd = mcparallel(significator(y, stat=sd, digits=TRUE))
		yMedian = mcparallel(significator(y, stat=median))
		yMad = mcparallel(significator(y, stat=mad))
	}
	else
	{
		yAve = significator(y, stat=mean, digits=TRUE)
		ySd = significator(y, stat=sd, digits=TRUE)
		yMedian = significator(y, stat=median)
		yMad = significator(y, stat=mad)
		res =list(yAve,ySd,yMedian,yMad)
	}


	if(symmetrical == TRUE)
	{
		ptm3 <- proc.time()
		if(parallelL)
		{
			no_cores <- min(nCores - 1,4 )
			cl <- makeCluster(no_cores)
			clusterExport(cl, "significator")
			clusterExport(cl, "symmetricalCI")
			quantileY = unlist(parLapply(cl, c(0.99,0.95,0.90,0.68), function(cover) significator(y, stat=symmetricalCI, estimate = meanY, coverage = cover)))
			stopCluster(cl)
		}
		else
		{
			quantileY = c(
				significator(y, stat=symmetricalCI, estimate = meanY, coverage = 0.99),
				significator(y, stat=symmetricalCI, estimate = meanY, coverage = 0.95),
				significator(y, stat=symmetricalCI, estimate = meanY, coverage = 0.90),
				significator(y, stat=symmetricalCI, estimate = meanY, coverage = 0.68)
			)
		}



		ptm3 <- proc.time() - ptm3
		cat("CCI time: ")
		print(ptm3)

	}
	else
	{
		if(parallelL)
		{
			no_cores <- min(nCores - 1,8 )
			cl <- makeCluster(no_cores)
			clusterExport(cl, "significator")
			quantileY = unlist(parLapply(cl, c(0.005,0.025,0.05,pnorm(-1),pnorm(1),0.95,0.975,0.995), function(prob) significator(y, stat=quantile, probs=prob)))
			stopCluster(cl)
		}
		else
		{

			quantileY = c(
				significator(y, stat=quantile, probs=0.005),
				significator(y, stat=quantile, probs=0.025),
				significator(y, stat=quantile, probs=0.05),
				significator(y, stat=quantile, probs=pnorm(-1)),
				significator(y, stat=quantile, probs=pnorm(1)),
				significator(y, stat=quantile, probs=0.95),
				significator(y, stat=quantile, probs=0.975),
				significator(y, stat=quantile, probs=0.995)
			)
		}

	}
	if( outputFile!="no-output")
	{
		ptm2 <- proc.time()
		if(parallelL2)
			writeThread =	mcparallel(eval(parse(text=paste0("save(y,",paste(varNames,collapse=","),",file = outputFile)"))))
		else
			eval(parse(text=paste0("save(y,",paste(varNames,collapse=","),",file = outputFile)")))
		ptm2 <- proc.time() - ptm2
		cat("write time: ")
		print(ptm2)
	}

	functionString = "yfunction = function (x) {"
	for(ik in 1:nbVar)
		functionString = paste(functionString,"varEnv$",varNames[ik] ,"=x[",ik,"];",sep = "")
	if(!is.null(pretreatment))
		functionString = paste(functionString, "eval(parse(text=pretreatment),envir = varEnv);")
	treatment = paste("yvalue=",expression)

	functionString = paste(functionString, "eval(parse(text=treatment),envir = varEnv);")
	functionString = paste(functionString, "return(varEnv$yvalue)}")

	try(eval(parse(text=functionString)))

	if(exists("yfunction"))
	{
		sdGauss=NA
		if(is.logical(correlation))
			try(sdGauss <- gummer(f=yfunction, x=meanX, u=sdX))
		else
			try(sdGauss <- gummer(f=yfunction, x=meanX, u=sdX, r=correlation))

	}

	## Sensitivity Coefficients and Uncertainty Budget
	ygrad=NA
	try(ygrad <- grad(f=yfunction, x=meanX))
	if(any(is.na(ygrad)))
		try(ygrad <- grad(f=yfunction, x=meanX,method = "complex"))
	if(!any(is.na(ygrad)))
	{
		sensitivity = ygrad
		if(is.na(sdGauss[2]) || (sdGauss[2]==Inf || sdGauss[2]==0 ))
		{
			proportions = rep(NA,length(sdX)+1)
		} else
		{
			residual = 1-sum(((ygrad*sdX)^2)/sdGauss[2]^2)
			if (abs(residual) < sqrt(.Machine$double.eps)) {residual = 0}
			proportions = c(((ygrad*sdX)^2)/(sdGauss[2]^2), residual)
		}

		budget = data.frame(
				"SensitivityCoeffs"=signif(c(sensitivity, NA), 2),
				"Percent.u2"=signif(100*proportions, 2))
		rownames(budget) = c(varNames, "Correlations")
	}
	## Computation of coverage intervals
	CI = matrix(rep(NA,16),ncol=4)
	if(symmetrical == TRUE)
	{

		CI[1,1] = meanY-quantileY[1]
		CI[2,1] = meanY+quantileY[1]
		CI[3,1] = signif((CI[2,1]-CI[1,1])/(2*sdY),2)

		CI[1,2] = meanY-quantileY[2]
		CI[2,2] = meanY+quantileY[2]
		CI[3,2] = signif((CI[2,2]-CI[1,2])/(2*sdY),2)

		CI[1,3] = meanY-quantileY[3]
		CI[2,3] = meanY+quantileY[3]
		CI[3,3] = signif((CI[2,3]-CI[1,3])/(2*sdY),2)

		CI[1,4] = meanY-quantileY[4]
		CI[2,4] = meanY+quantileY[4]
		CI[3,4] = signif((CI[2,4]-CI[1,4])/(2*sdY),2)

	}
	else
	{
		CI[1,1] = quantileY[1]
		CI[2,1] = quantileY[8]
		CI[3,1] = signif((CI[2,1]-CI[1,1])/(2*sdY),2)

		CI[1,2] = quantileY[2]
		CI[2,2] = quantileY[7]
		CI[3,2] = signif((CI[2,2]-CI[1,2])/(2*sdY),2)

		CI[1,3] = quantileY[3]
		CI[2,3] = quantileY[6]
		CI[3,3] = signif((CI[2,3]-CI[1,3])/(2*sdY),2)

		CI[1,4] = quantileY[4]
		CI[2,4] = quantileY[5]
		CI[3,4] = signif((CI[2,4]-CI[1,4])/(2*sdY),2)

	}

	if(parallelL2)
	{
		res <- mccollect(list(yAve, ySd,yMedian,yMad))
		yAve = res[[1]]
		ySd = res[[2]]
		yMedian = res[[3]]
		yMad = res[[4]]
	}

	if(parallelL2)
	{
		res2 <- mccollect(list(s))
		s = res2[[1]]
	}
	ssr = s[[1]]["Residuals", "Sum Sq"]
	ss = s[[1]]$"Sum Sq"
	rowNames = dimnames(as.data.frame(s[[1]]))[[1]]
	rowNames = rowNames[1:length(rowNames)-1]
	anova = cbind(c(round(100*ss[-length(ss)]/(sum(ss)-ssr), 2), NA),round(100*ss/sum(ss), 2))

	dimnames(anova) = list(c(rowNames, "Residual"),
												 c("w/out Residual", "w/ Residual"))

	outString = "===== RESULTS ==============================\r\n"
	outString = c(outString,     "Monte Carlo Method\r\n")
	outString = c(outString, paste("Summary statistics for sample of size", nbReal, "\r\n"))
	outString = c(outString, paste("ave     =", yAve$value))
	outString = c(outString, paste("sd      =", ySd$value) )

	outString = c(outString, paste("median  =",	yMedian))
	outString = c(outString, paste("mad     =", yMad, "\r\n"))
	if(symmetrical == TRUE)
		outString = c(outString, paste("Symmetrical coverage intervals\r\n"))
	else
		outString = c(outString, paste("Coverage intervals\r\n"))

	outString = c(outString, paste(sprintf("99%% (%8g, %8g)\tk = %8g ",CI[1,1],CI[2,1],CI[3,1])))
	outString = c(outString, paste(sprintf("95%% (%8g, %8g)\tk = %8g ",CI[1,2],CI[2,2],CI[3,2])))
	outString = c(outString, paste(sprintf("90%% (%8g, %8g)\tk = %8g ",CI[1,3],CI[2,3],CI[3,3])))
	outString = c(outString, paste(sprintf("68%% (%8g, %8g)\tk = %8g ",CI[1,4],CI[2,4],CI[3,4])))

	outString = c(outString, paste("\r\nANOVA (% Contributions)\r\n"))
	outString = c(outString,capture.output(anova))
	outString = c(outString, paste("\r\n--------------------------------------------\r\n"))
	outString = c(outString, paste("Gauss's Formula (GUM's Linear Approximation)", "\r\n"))
	if(any(is.na(sdGauss)))
		outString = c(outString, paste("Impossible to compute gradient", "\r\n"))
	outString = c(outString, paste("        y  =", signif( sdGauss[1], yAve$digits)))
	outString = c(outString, paste("      u(y) =", signif( sdGauss[2], ySd$digits), "\r\n"))
	if(exists("budget"))
		outString = c(outString,capture.output(budget))
	outString = c(outString, paste("============================================\r\n"))

	cat(outString , sep = "\r\n", fill = FALSE, labels = NULL)
	if(outputFile!="no-output")
	{
		write(outString, file = outputFile2, append = FALSE)
		output.file <- file(outputFile2, "wb")
		#write(outString, file = outputFile2, append = FALSE)
		write.table(outString, col.names=FALSE, row.names=FALSE, quote=FALSE, file = output.file, append=FALSE, eol="\r\n")
		close(output.file)
	}

	if(parallelL2)
		res2 <- mccollect(list(writeThread))

}


#Result Formating
######################################################################
## SECTION (SPECIFICATION) ===========================================
######################################################################
## Function mergeOutput:
## Function merging the different results file in one
## =======================
## SPECIFICATION -- INPUTS

## (outputFile) Base Name of the results files

## (nbOut) the number of outputs


mergeOutput = function (outputFile,nbOut)
{
	fileList = {};

	for (ii in 1:nbOut)
	{
		tempFile =paste(outputFile,ii,"-results.txt",sep="")
		fileList = c(fileList,tempFile)
	}

	outputList = paste(outputFile,"All-results.txt",sep="")

  output.file <- file(outputList, "wb")

	for( ii in 1:nbOut)
	{
		write.table(paste("=====RESULTS OUTPUT",ii,"======================\r\n"), col.names=FALSE, row.names=FALSE, quote=FALSE, file = output.file, append=TRUE, eol="\r\n")
		fh = file( fileList[ii], open='rt' )
		lines = readLines(fh)
		lines = lines [-1:-2]
		write.table(lines, col.names=FALSE, row.names=FALSE, quote=FALSE, file = output.file, append=TRUE, eol="\r\n")
		close(fh)
	}
	close(output.file)


	fileList = {};

	for (ii in 1:nbOut)
	{
		tempFile =paste(outputFile,ii,"-values.Rd",sep="")
		fileList = c(fileList,tempFile)
	}


	outputList = paste(outputFile,"All-values.Rd",sep="")

	yList = list()
	outNames= NULL
	for( ii in 1:length(fileList))
	{
		if(file.exists(fileList[ii]))
		{
			load(fileList[ii])
			if(exists("y"))
			{
				yList =c(yList,list(y))
				outNames = c(outNames,paste("y",as.character(ii),sep=""))
			}
		}

	}

	yList = as.data.frame(yList)
	dimnames(yList)[[2]] = outNames

	save(yList,file = outputList)

}

#drawDistrib
drawDistrib = function(type,parameters,varNames,varEnv,errorFile,ii)
{
	varTemp=NaN
	meanX=NaN
	sdX=NaN
	if(type[ii]==0)  ## Bernoulli (Prob. of success)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=rbinom(nbReal, size=1, prob=parameters[[ii]][1])*1.0
		meanX=parameters[[ii]][1];
		sdX=sqrt(parameters[[ii]][1]*(1-parameters[[ii]][1]));
	}
	if(type[ii]==1)  ## Beta (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		a = Mean*(Mean*(1-Mean)-StdDev^2)/StdDev^2
		b = (1-Mean)*(Mean*(1-Mean)-StdDev^2)/StdDev^2
		varTemp=rbeta(nbReal, shape1=a, shape2=b)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==2) ## Beta (Shape1, Shape2)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=rbeta(nbReal, shape1=parameters[[ii]][1], shape2=parameters[[ii]][2])
		meanX = parameters[[ii]][1]/(parameters[[ii]][1]+parameters[[ii]][2])
		sdX = sqrt(parameters[[ii]][1]*parameters[[ii]][2]/(((parameters[[ii]][1]+parameters[[ii]][2])^2)*(parameters[[ii]][1]+parameters[[ii]][2]+1)))
	}
	if(type[ii]==3) ## Chi-Squared (DF)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=rchisq(nbReal, df=parameters[[ii]][1])
		meanX = parameters[[ii]][1];
		sdX   = sqrt(2*parameters[[ii]][1]);
	}
	if(type[ii]==4) ## Exponential (Mean)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp= rexp(nbReal, rate=1/parameters[[ii]][1])
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][1];
	}
	if(type[ii]==5) ## Gamma (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		Shape = (Mean/StdDev)^2
		Scale = StdDev^2/Mean
		varTemp=rgamma(nbReal, shape=Shape, scale=Scale)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==6) ## Gamma (Shape, Scale)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=rgamma(nbReal, shape=parameters[[ii]][1], scale=parameters[[ii]][2])
		meanX = parameters[[ii]][1]* parameters[[ii]][2];
		sdX   = sqrt(parameters[[ii]][1])* parameters[[ii]][2];
	}
	if(type[ii]==7) ## Gaussian (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=rnorm(nbReal, mean=parameters[[ii]][1], sd=parameters[[ii]][2])
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==8) ## Gaussian -- Truncated (Mean, StdDev, Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=rtruncnorm(nbReal, a=parameters[[ii]][3], b=parameters[[ii]][4], mean=parameters[[ii]][1], sd=parameters[[ii]][2])
		meanX = etruncnorm(a=parameters[[ii]][3], b=parameters[[ii]][4], mean=parameters[[ii]][1], sd=parameters[[ii]][2])
		sdX   = sqrt(vtruncnorm(a=parameters[[ii]][3], b=parameters[[ii]][4], mean=parameters[[ii]][1], sd=parameters[[ii]][2]))
	}
	if(type[ii]==9) ## Rectangular -- Continuous (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		a = Mean - StdDev*sqrt(3)
		b = Mean + StdDev*sqrt(3)
		varTemp=runif(nbReal, min=a, max=b)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==10) ## Rectangular -- Continuous (Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=runif(nbReal, min=parameters[[ii]][1], max=parameters[[ii]][2])
		meanX = (parameters[[ii]][1]+parameters[[ii]][2])/2;
		sdX   = (parameters[[ii]][2]-parameters[[ii]][1])/sqrt(12);
	}
	if(type[ii]==11) ## Student t (Mean, StdDev, DF)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		scale = parameters[[ii]][2]/sqrt(parameters[[ii]][3]/(parameters[[ii]][3]-2))
		varTemp = parameters[[ii]][1] + scale*rt(nbReal, df=parameters[[ii]][3])
		meanX = parameters[[ii]][1];
		sdX = parameters[[ii]][2];
	}
	if(type[ii]==12) ## Student t (Center, Scale, DF)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp = parameters[[ii]][1] + parameters[[ii]][2]*rt(nbReal, df=parameters[[ii]][3])
		meanX = parameters[[ii]][1];
		if (parameters[[ii]][3] > 2)
			sdX = parameters[[ii]][2] * sqrt(parameters[[ii]][3]/(parameters[[ii]][3]-2))
		else
			sdX = Inf

	}


	if(type[ii]==13) ## Triangular -- Symmetric (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		c = Mean
		a = Mean - StdDev*sqrt(6)
		b = Mean + StdDev*sqrt(6)
		varTemp = rtriangle(nbReal, a, b, c)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}

	if(type[ii]==14) ## Triangular -- Symmetric (Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp = rtriangle(nbReal, a=parameters[[ii]][1], b=parameters[[ii]][2], c=(parameters[[ii]][1]+parameters[[ii]][2])/2)
		a = parameters[[ii]][1]
		b = parameters[[ii]][2]
		c = (a+b)/2
		meanX = (a+b+c)/3;
		sdX   = sqrt((a^2 + b^2 + c^2 - a*b - a*c - b*c)/18)
	}
	if(type[ii]==15) ## Triangular -- Asymmetric (Left, Mode, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp = rtriangle(nbReal, a=parameters[[ii]][1], b=parameters[[ii]][3], c=parameters[[ii]][2])
		a = parameters[[ii]][1]
		b = parameters[[ii]][3]
		c = parameters[[ii]][2]
		meanX = (a+b+c)/3;
		sdX   = sqrt((a^2 + b^2 + c^2 - a*b - a*c - b*c)/18)
	}
	if(type[ii]==16) ## Uniform -- Continuous (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		a = Mean - StdDev*sqrt(3)
		b = Mean + StdDev*sqrt(3)
		varTemp=runif(nbReal, min=a, max=b)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==17) ## Uniform -- Continuous (Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=runif(nbReal, min=parameters[[ii]][1], max=parameters[[ii]][2])
		meanX = (parameters[[ii]][1]+parameters[[ii]][2])/2;
		sdX   = (parameters[[ii]][2]-parameters[[ii]][1])/sqrt(12);
	}
	if(type[ii]==18) ## Weibull (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		f = function (betaeta, mu, sigma)
		{
			beta = betaeta[1]; eta = betaeta[2]
			y = numeric(2)
			y[1] = eta*gamma(1 + 1/beta) - mu
			y[2] = eta^2 * (gamma(1 + 2/beta) - gamma(1 + 1/beta)^2) - sigma^2
			return(y)
		}
		s = nleqslv(x=c(1,1), fn=f, mu=parameters[[ii]][1], sigma=parameters[[ii]][2])
		if (s$termcd %in% c(1,2))
		{
			beta = s$x[1]; eta = s$x[2]
		}else {
			errorStop("Cannot assign given Mean and StdDev to Weibull distribution\n", errorFile)
		}
		varTemp=rweibull(nbReal, shape=beta, scale=eta)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==19) ## Weibull (Shape, Scale)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=rweibull(nbReal, shape=parameters[[ii]][1], scale=parameters[[ii]][2])
		meanX = parameters[[ii]][2] * gamma(1 + 1/parameters[[ii]][1]);
		sdX   = parameters[[ii]][2] * sqrt(gamma(1 + 2/parameters[[ii]][1]) - (gamma(1 + 1/parameters[[ii]][1]))^2);
	}
	if(type[ii]==20) ## Constant (value)
	{
		varTemp=rep(parameters[[ii]][1],nbReal)
		meanX = parameters[[ii]][1];
		sdX   = 0;
	}
	if(type[ii]==21)  ## Beta (Mean, StdDev, Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		Left=parameters[[ii]][3]
		Right=parameters[[ii]][4]
		M = (Mean-Left)/(Right-Left)
		S = StdDev/sqrt(Right-Left)
		a = M*(M*(1-M)-S^2)/S^2
		b = (1-M)*(M*(1-M)-S^2)/S^2

		varTemp=Left + (Right-Left)*rbeta(nbReal, shape1=a, shape2=b)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}

	if(type[ii]==22) ## Beta (Shape1, Shape2, Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=parameters[[ii]][3] + (parameters[[ii]][4]-parameters[[ii]][3])*rbeta(nbReal, shape1=parameters[[ii]][1], shape2=parameters[[ii]][2])
		meanX = parameters[[ii]][1]/(parameters[[ii]][1]+parameters[[ii]][2])
		sdX = sqrt(parameters[[ii]][1]*parameters[[ii]][2]/(((parameters[[ii]][1]+parameters[[ii]][2])^2)*(parameters[[ii]][1]+parameters[[ii]][2]+1)))
	}

	if(type[ii]==23) ## Lognormal (Mean, StdDev)
    {
        checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
        eta=parameters[[ii]][1]
        tau=parameters[[ii]][2]
        sigma = sqrt(log((tau/eta)^2 + 1))
        mu = log(eta) - 0.5*sigma^2
        varTemp = rlnorm(nbReal, meanlog=mu, sdlog=sigma)
        meanX = parameters[[ii]][1];
        sdX = parameters[[ii]][2];

	}
	if(type[ii]==24) ## Sample distribution provided
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp = sample(parameters[[ii]], nbReal, replace=T)
		meanX = mean(parameters[[ii]]);
		sdX = sd(parameters[[ii]]);

	}
	if(type[ii]==26) ## Asymmetric (Median, Left uncertainty, Right uncertainty, Coverage probability)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)

		A.model = asymmetricalModelSelection(x=parameters[[ii]][1] , uL=parameters[[ii]][1]-parameters[[ii]][2] ,
                                     uR=parameters[[ii]][3]-parameters[[ii]][1] , p=parameters[[ii]][4])

		varTemp = asymmetricalModelSample(nbReal, A.model)
		meanX = mean(parameters[[ii]][1]);
		sdX = mad(varTemp);

	}


	varEnv$varTemp=varTemp
	eval(parse(text=paste(varNames[ii], "=varTemp",sep="")),envir = varEnv)

	res <- list("meanX"=meanX,"sdX"=sdX)
	return(res)
}



drawDistribCorel = function(type,parameters,varNames,z,varEnv,errorFile,ii)
{
	varTemp=NaN
	meanX=NaN
	sdX=NaN
	if(type[ii]==0)  ## Bernoulli (Prob. of success)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=qbinom(z[,ii], size=1, prob=parameters[[ii]][1])*1.0
		meanX=parameters[[ii]][1];
		sdX=sqrt(parameters[[ii]][1]*(1-parameters[[ii]][1]));
	}

	if(type[ii]==1)  ## Beta (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		a = Mean*(Mean*(1-Mean)-StdDev^2)/StdDev^2
		b = (1-Mean)*(Mean*(1-Mean)-StdDev^2)/StdDev^2
		varTemp=qbeta(z[,ii], shape1=a, shape2=b)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}

	if(type[ii]==2) ## Beta (Shape1, Shape2)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=qbeta(z[,ii], shape1=parameters[[ii]][1], shape2=parameters[[ii]][2])
		meanX = parameters[[ii]][1]/(parameters[[ii]][1]+parameters[[ii]][2])
		sdX = sqrt(parameters[[ii]][1]*parameters[[ii]][2]/(((parameters[[ii]][1]+parameters[[ii]][2])^2)*(parameters[[ii]][1]+parameters[[ii]][2]+1)))
	}
	if(type[ii]==3) ## Chi-Squared (DF)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=qchisq(z[,ii], df=parameters[[ii]][1])
		meanX = parameters[[ii]][1];
		sdX   = sqrt(2*parameters[[ii]][1]);
	}
	if(type[ii]==4) ## Exponential (Mean)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp= qexp(z[,ii], rate=1/parameters[[ii]][1])
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][1];
	}
	if(type[ii]==5) ## Gamma (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		Shape = (Mean/StdDev)^2
		Scale = StdDev^2/Mean
		varTemp=qgamma(z[,ii], shape=Shape, scale=Scale)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==6) ## Gamma (Shape, Scale)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=qgamma(z[,ii], shape=parameters[[ii]][1], scale=parameters[[ii]][2])
		meanX = parameters[[ii]][1]* parameters[[ii]][2];
		sdX   = sqrt(parameters[[ii]][1])* parameters[[ii]][2];
	}
	if(type[ii]==7) ## Gaussian (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=qnorm(z[,ii], mean=parameters[[ii]][1], sd=parameters[[ii]][2])
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==8) ## Gaussian -- Truncated (Mean, StdDev, Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=qtruncnorm(z[,ii], a=parameters[[ii]][3], b=parameters[[ii]][4], mean=parameters[[ii]][1], sd=parameters[[ii]][2])
		meanX = etruncnorm(a=parameters[[ii]][3], b=parameters[[ii]][4], mean=parameters[[ii]][1], sd=parameters[[ii]][2])
		sdX   = sqrt(vtruncnorm(a=parameters[[ii]][3], b=parameters[[ii]][4], mean=parameters[[ii]][1], sd=parameters[[ii]][2]))
	}
	if(type[ii]==9) ## Rectangular -- Continuous (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		a = Mean - StdDev*sqrt(3)
		b = Mean + StdDev*sqrt(3)
		varTemp=qunif(z[,ii], min=a, max=b)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==10) ## Rectangular -- Continuous (Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=qunif(z[,ii], min=parameters[[ii]][1], max=parameters[[ii]][2])
		meanX = (parameters[[ii]][1]+parameters[[ii]][2])/2;
		sdX   = (parameters[[ii]][2]-parameters[[ii]][1])/sqrt(12);
	}
	if(type[ii]==11) ## Student t (Mean, StdDev, DF)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		scale = parameters[[ii]][2]/sqrt(parameters[[ii]][3]/(parameters[[ii]][3]-2))
		varTemp = parameters[[ii]][1] + scale*qt(z[,ii], df=parameters[[ii]][3])
		meanX = parameters[[ii]][1];
		sdX = parameters[[ii]][2];

	}
	if(type[ii]==12) ## Student t (Center, Scale, DF)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp = parameters[[ii]][1] + parameters[[ii]][2]*qt(z[,ii], df=parameters[[ii]][3])
		meanX = parameters[[ii]][1];
		if (parameters[[ii]][3] > 2)
			sdX = parameters[[ii]][2] * sqrt(parameters[[ii]][3]/(parameters[[ii]][3]-2))
		else
			sdX = Inf

	}
	if(type[ii]==13) ## Triangular -- Symmetric (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		c = Mean
		a = Mean - StdDev*sqrt(6)
		b = Mean + StdDev*sqrt(6)
		varTemp = qtriangle(z[,ii], a, b, c)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==14) ## Triangular -- Symmetric (Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp = qtriangle(z[,ii], a=parameters[[ii]][1], b=parameters[[ii]][2], c=(parameters[[ii]][1]+parameters[[ii]][2])/2)
		a = parameters[[ii]][1]
		b = parameters[[ii]][2]
		c = (a+b)/2
		meanX = (a+b+c)/3;
		sdX   = sqrt((a^2 + b^2 + c^2 - a*b - a*c - b*c)/18)
	}
	if(type[ii]==15) ## Triangular -- Asymmetric (Left, Mode, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp = qtriangle(z[,ii], a=parameters[[ii]][1], b=parameters[[ii]][3], c=parameters[[ii]][2])
		a = parameters[[ii]][1]
		b = parameters[[ii]][3]
		c = parameters[[ii]][2]
		meanX = (a+b+c)/3;
		sdX   = sqrt((a^2 + b^2 + c^2 - a*b - a*c - b*c)/18)
	}
	if(type[ii]==16) ## Uniform -- Continuous (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		a = Mean - StdDev*sqrt(3)
		b = Mean + StdDev*sqrt(3)
		varTemp=qunif(z[,ii], min=a, max=b)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==17) ## Uniform -- Continuous (Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=qunif(z[,ii], min=parameters[[ii]][1], max=parameters[[ii]][2])
		meanX = (parameters[[ii]][1]+parameters[[ii]][2])/2;
		sdX   = (parameters[[ii]][2]-parameters[[ii]][1])/sqrt(12);
	}
	if(type[ii]==18) ## Weibull (Mean, StdDev)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		f = function (betaeta, mu, sigma)
		{
			beta = betaeta[1]; eta = betaeta[2]
			y = numeric(2)
			y[1] = eta*gamma(1 + 1/beta) - mu
			y[2] = eta^2 * (gamma(1 + 2/beta) - gamma(1 + 1/beta)^2) - sigma^2
			return(y)
		}
		s = nleqslv(x=c(1,1), fn=f, mu=parameters[[ii]][1], sigma=parameters[[ii]][2])
		if (s$termcd %in% c(1,2))
		{
			beta = s$x[1]
			eta = s$x[2]
		}
		else
			errorStop("Cannot assign given Mean and StdDev to Weibull distribution\n",errorFile)

		varTemp=qweibull(z[,ii], shape=beta, scale=eta)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];
	}
	if(type[ii]==19) ## Weibull (Shape, Scale)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=qweibull(z[,ii], shape=parameters[[ii]][1], scale=parameters[[ii]][2])
		meanX = parameters[[ii]][2] * gamma(1 + 1/parameters[[ii]][1]);
		sdX   = parameters[[ii]][2] * sqrt(gamma(1 + 2/parameters[[ii]][1]) - (gamma(1 + 1/parameters[[ii]][1]))^2);

	}
	if(type[ii]==20) ## Constant (value)
	{
		varTemp=rep(parameters[[ii]][1],nbReal)
		meanX = parameters[[ii]][1];
		sdX   = 0;

	}
	if(type[ii]==21)  ## Beta (Mean, StdDev, Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		Mean=parameters[[ii]][1]
		StdDev=parameters[[ii]][2]
		Left=parameters[[ii]][3]
		Right=parameters[[ii]][4]
		M = (Mean-Left)/(Right-Left)
		S = StdDev/sqrt(Right-Left)
		a = M*(M*(1-M)-S^2)/S^2
		b = (1-M)*(M*(1-M)-S^2)/S^2

		varTemp=Left + (Right-Left)*qbeta(z[,ii], shape1=a, shape2=b)
		meanX = parameters[[ii]][1];
		sdX   = parameters[[ii]][2];


	}
	if(type[ii]==22) ## Beta (Shape1, Shape2, Left, Right)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp=parameters[[ii]][3] + (parameters[[ii]][4]-parameters[[ii]][3])*qbeta(z[,ii], shape1=parameters[[ii]][1], shape2=parameters[[ii]][2])
		meanX = parameters[[ii]][1]/(parameters[[ii]][1]+parameters[[ii]][2])
		sdX = sqrt(parameters[[ii]][1]*parameters[[ii]][2]/(((parameters[[ii]][1]+parameters[[ii]][2])^2)*(parameters[[ii]][1]+parameters[[ii]][2]+1)))

	}

	if(type[ii]==23) ## Lognormal (Mean, StdDev)
    {
        checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
        eta=parameters[[ii]][1]
        tau=parameters[[ii]][2]
        sigma = sqrt(log((tau/eta)^2 + 1))
        mu = log(eta) - 0.5*sigma^2
        varTemp=qlnorm(z[,ii], meanlog=mu, sdlog=sigma)
        meanX = parameters[[ii]][1];
        sdX   = parameters[[ii]][2];
	}

	if(type[ii]==24) ## Sample distribution provided
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
		varTemp = quantile(parameters[[ii]], probs = z[,ii], name=FALSE)
		meanX = mean(parameters[[ii]]);
		sdX = sd(parameters[[ii]]);

	}
	if(type[ii]==26) ## Asymmetric (Median, Left uncertainty, Right uncertainty, Coverage probability)
	{
		checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)

		A.model = asymmetricalModelSelection(x=parameters[[ii]][1] , uL=parameters[[ii]][1]-parameters[[ii]][2] ,
																		 uR=parameters[[ii]][3]-parameters[[ii]][1] , p=parameters[[ii]][4],forceGEV=TRUE)


		varTemp = asymmetricalModelQuantiles(z[,ii], A.model)
		meanX = mean(parameters[[ii]][1]);
		sdX = mad(varTemp);

	}
	varEnv$varTemp=varTemp
	eval(parse(text=paste(varNames[ii], "=varTemp",sep="")),envir = varEnv)


	res <- list("meanX"=meanX,"sdX"=sdX)
	return(res)
}


#Check Parameters
checkParam = function(type,parameters,varNames,outputFile,tol=sqrt(.Machine$double.eps))
{
	if(type==0)  ## Bernoulli (Prob. of success)
	{
		if(parameters[1]<=0 || parameters[1]>=1 )
			errorStop(paste("In quantity ",varNames,": Probability must be greater than 0 and smaller than 1"), outputFile)
	}
	if(type==1)  ## Beta (Mean, StdDev)
	{
		mu = parameters[1]
		sigma = parameters[2]
		if(mu<=0||mu>=1) {
			errorStop(
				paste("In quantity ", varNames,": Mean must be greater than 0 and smaller than 1"),	outputFile) }
		if(sigma<=0||sigma>=0.5) {
			errorStop(
				paste("In quantity ", varNames,": StdDev must be greater than 0 and smaller than 1/2"),outputFile) }
		alpha = mu*(mu*(1-mu)-sigma^2)/sigma^2
		beta = (1-mu)*(mu*(1-mu)-sigma^2)/sigma^2
		if(alpha<=0 || beta<=0) {
			errorStop(
				paste("In quantity ", varNames,"Illegal combination of Mean and StdDev"),outputFile) }
		if ((abs(alpha-beta)<tol) & (alpha < 1) &
			((sigma < sqrt(1/12) || (sigma > sqrt(1/4))))) {
			errorStop(
				paste("In quantity ", varNames,": StdDev must be between ", signif(1/sqrt(12),3), "and 1/2"),outputFile) }
		if ((abs(alpha-beta)<tol) & (min(c(alpha,beta)) > 1) &
			(sigma > sqrt(1/12))) {
			errorStop(
				paste("In quantity ", varNames, ": StdDev must be less than ", signif(sqrt(1/12), 3)),outputFile) }
		if ((abs(alpha-beta)<tol) & (alpha > 2) & (sigma > sqrt(1/20))) {
			errorStop(
				paste("In quantity ", varNames,": StdDev must be less than ", signif(sqrt(1/20), 3)),outputFile) }
		if ((alpha < 1) & (beta > 1) & (sigma > sqrt((5*sqrt(5)-11)/2))) {
			errorStop(paste("In quantity ", varNames,": StdDev must be less than ",signif(sqrt((5*sqrt(5)-11)/2), 3)),outputFile) }
		if ((abs(alpha-1)<tol) & (beta > 1) & (beta < 2) &
			((sigma < sqrt(1/18) || (sigma > sqrt(1/12))))) {
			errorStop(
				paste("In quantity ", varNames,": StdDev must be between",signif(1/sqrt(18),3), "and", signif(1/sqrt(12), 3)),outputFile) }
		if ((abs(alpha-1)<tol) & (beta > 2) & ((sigma > sqrt(1/18)))) {
			errorStop(
				paste("In quantity ", varNames,": StdDev must be less than", signif(1/sqrt(18),3)),outputFile) }
		if ((alpha > 1) & (alpha < 2) & (abs(beta-1) < tol) &
			((sigma < 1/sqrt(18)) || (sigma > 1/sqrt(12)))) {
			errorStop(
				paste("In quantity ", varNames,": StdDev must be between",signif(1/sqrt(18),3), "and", signif(1/sqrt(12), 3)),outputFile) }
		if ((alpha > 2) & (abs(beta-1)<tol) & ((sigma > sqrt(1/18)))) {
			errorStop(
				paste("In quantity ", varNames, ": StdDev must be less than", signif(1/sqrt(18),3)),outputFile) }

	}
	if(type==2) ## Beta (Shape1, Shape2)
	{
		if(parameters[1]<=0 || parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": Both shape parameters must be positive"), outputFile)
	}
	if(type==3) ## Chi-Squared (DF)
	{
		if(parameters[1]<=0)
			errorStop(paste("In quantity ",varNames,": No. of degrees of freedom must be positive"), outputFile)

	}
	if(type==4) ## Exponential (Mean)
	{
		if(parameters[1]<=0)
			errorStop(paste("In quantity ",varNames,": The mean must be positive"), outputFile)

	}
	if(type==5) ## Gamma (Mean, StdDev)
	{
		if(parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": StdDev must be positive"), outputFile)

		if(parameters[1]<=0)
			errorStop(paste("In quantity ",varNames,": The mean must be positive"), outputFile)
	}
	if(type==6) ## Gamma (Shape, Scale)
	{
		if(parameters[1]<=0 || parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": The shape and the scale must be positive"), outputFile)
	}
	if(type==7) ## Gaussian (Mean, StdDev)
	{
		if(parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": StdDev must be positive"), outputFile)
	}
	if(type==8) ## Gaussian -- Truncated (Mean, StdDev, Left, Right)
	{
		if(parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": StdDev must be positive"), outputFile)
		if(parameters[3]>=parameters[4])
			errorStop(paste("In quantity ",varNames,": Left must be less than Right"), outputFile)
	}
	if(type==9) ## Rectangular -- Continuous (Mean, StdDev)
	{
		if(parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": StdDev must be positive"), outputFile)
	}
	if(type==10) ## Rectangular -- Continuous (Left, Right)
	{
		if(parameters[1]>=parameters[2])
			errorStop(paste("In quantity ",varNames,": Left must be less than Right"), outputFile)
	}
	if(type==11) ## Student t (Mean, StdDev, DF)
	{
		if(parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": StdDev must be positive"), outputFile)
		if(parameters[3]<=2)
			errorStop(paste("In quantity ",varNames,": No. of degrees of freedom must be greater than 2"), outputFile)
	}
	if(type==12) ## Student t (Center, Scale, DF)
	{
		if(parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": Scale must be positive"), outputFile)
		if(parameters[3]<=0)
			errorStop(paste("In quantity ",varNames,": No. of degrees of freedom must be positive"), outputFile)
	}


	if(type==13) ## Triangular -- Symmetric (Mean, StdDev)
	{
		if(parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": StdDev must be positive"), outputFile)
	}

	if(type==14) ## Triangular -- Symmetric (Left, Right)
	{
		if(parameters[1]>=parameters[2])
			errorStop(paste("In quantity ",varNames,": Left must be less than Right"), outputFile)
	}
	if(type==15) ## Triangular -- Asymmetric (Left, Mode, Right)
	{
		if(parameters[1]>parameters[2] )
			errorStop(paste("In quantity ",varNames,": Left must be less than or equal to Mode"), outputFile)
		if(parameters[2]>parameters[3] )
			errorStop(paste("In quantity ",varNames,": Mode must be less than or equal to Right"), outputFile)
		if(parameters[1] == parameters[3] )
			errorStop(paste("In quantity ",varNames,": Left and Right must be different"), outputFile)
	}
	if(type==16) ## Uniform -- Continuous (Mean, StdDev)
	{
		if(parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": StdDev must be positive"), outputFile)
	}
	if(type==17) ## Uniform -- Continuous (Left, Right)
	{
		if(parameters[1]>=parameters[2])
			errorStop(paste("In quantity ",varNames,": Left must be less than Right"), outputFile)
	}
	if(type==18) ## Weibull (Mean, StdDev)
	{
		if(parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": StdDev must be positive"), outputFile)
		if(parameters[1]<=0)
			errorStop(paste("In quantity ",varNames,": The mean must be positive"), outputFile)
	}
	if(type==19) ## Weibull (Shape, Scale)
	{
		if(parameters[1]<=0 || parameters[2]<=0)
			errorStop(paste("In quantity ",varNames,": The shape and the scale must be positive"), outputFile)
	}

	if(type==20) ## Constant (value)
	{

	}

	if(type==21) ## Beta (Mean, StdDev, Left, Right)
        {

            mu = parameters[1]
            sigma = parameters[2]
            Left = parameters[3]
            Right = parameters[4]
            if(mu<=Left||mu>=Right) {
                errorStop(
                    paste("In quantity ", varNames,
                    ": Mean must be greater than Left and smaller than Right"),
                    outputFile) }
            if(sigma<=0||sigma>=0.5*sqrt(Right-Left)) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": StdDev must be greater than 0 and smaller than",
                          signif(0.5*sqrt(Right-Left), 3)),
                    outputFile) }
            M = (mu-Left)/(Right-Left)
            S = sigma/sqrt(Right-Left)
            alpha = M*(M*(1-M)-S^2)/S^2
            beta = (1-M)*(M*(1-M)-S^2)/S^2
            if(alpha<=0 || beta<=0) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": Illegal combination of Mean and StdDev"),outputFile) }
            if ((abs(alpha-beta)<tol) & (alpha < 1) &
                ((sigma < (Right-Left)*sqrt(1/12) ||
                      (sigma > (Right-Left)*sqrt(1/4))))) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": StdDev must be between",
                          signif((Right-Left)*sqrt(1/12),3),
                          "and", signif((Right-Left)*sqrt(1/4),3)),outputFile) }
            if ((abs(alpha-beta)<tol) & (min(c(alpha,beta)) > 1) &
                (sigma > (Right-Left)*sqrt(1/12))) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": StdDev must be less than",
                          signif((Right-Left)*sqrt(1/12), 3)),outputFile) }
            if ((abs(alpha-beta)<tol) & (alpha > 2) &
                (sigma > (Right-Left)*sqrt(1/20))) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": StdDev must be less than",
                          signif((Right-Left)*sqrt(1/20), 3)),outputFile) }
            if ((alpha < 1) & (beta > 1) &
                (sigma > (Right-Left)*sqrt((5*sqrt(5)-11)/2))) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": StdDev must be less than",
                          signif((Right-Left)*sqrt((5*sqrt(5)-11)/2), 3)),outputFile) }
            if ((abs(alpha-1)<tol) & (beta > 1) & (beta < 2) &
                ((sigma < (Right-Left)*sqrt(1/18) ||
                      (sigma > (Right-Left)*sqrt(1/12))))) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": StdDev must be between",
                          signif((Right-Left)*sqrt(1/18), 3), "and",
                          signif((Right-Left)*sqrt(1/12), 3)),outputFile) }
            if ((abs(alpha-1)<tol) & (beta > 2) &
                ((sigma > (Right-Left)*sqrt(1/18)))) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": StdDev must be less than",
                          signif((Right-Left)*sqrt(1/18), 3)),
                    outputFile) }
            if ((alpha > 1) & (alpha < 2) & (abs(beta-1) < tol) &
                ((sigma < (Right-Left)*sqrt(1/18)) ||
                     (sigma > (Right-Left)*sqrt(1/12)))) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": StdDev must be between",
                          signif((Right-Left)*sqrt(1/18), 3), "and",
                          signif((Right-Left)*sqrt(1/12), 3)),outputFile) }
            if ((alpha > 2) & (abs(beta-1)<tol) &
                ((sigma > (Right-Left)*sqrt(1/18)))) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": StdDev must be less than",
                          signif((Right-Left)*sqrt(1/18),3)),outputFile) }
        }

    if(type==22) ## Beta (Shape1, Shape2, Left, Right)
	{
            alpha = parameters[1]
            beta = parameters[2]
            Left = parameters[3]
            Right = parameters[4]

            if(alpha<=0 || beta<=0) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": Both shape parameters must be positive"),
                    outputFile) }

            if(Left >= Right) {
                errorStop(
                    paste("In quantity ", varNames,
                          ": Left must be strictly smaller than Right"),
                    outputFile) }
	}

	if(type==23) ## Lognormal (Mean, StdDev)
	{
		eta = parameters[1]
		tau = parameters[2]
		if(eta<=0) {
			errorStop(
				paste("In quantity ", varNames,
					  ": Mean must be greater than 0"),
				outputFile) }
		if(tau<=0) {
			errorStop(
				paste("In quantity ", varNames,
				": StdDev must be greater than 0"),
				outputFile) }
	}

	if(type==24) ## Sample distribution provided
	{
		sampleSize = length(parameters)
		if(sampleSize<30) {
			errorStop(
				paste("In quantity ", varNames,
						": The number of sample must be bigger than 30"),
				outputFile) }
		if(sampleSize>100000) {
			errorStop(
				paste("In quantity ", varNames,
				": The number of sample must be smaller than 100000"),
				outputFile) }
	}
  if(type==26) ## Asymmetric (Median, Left uncertainty, Right uncertainty, Coverage probability)
  {
    if(parameters[2]>parameters[1] )
      errorStop(paste("In quantity ",varNames,": Left must be less than or equal to Mode"), outputFile)
    if(parameters[1]>parameters[3] )
      errorStop(paste("In quantity ",varNames,": Mode must be less than or equal to Right"), outputFile)
    if(parameters[2] == parameters[3] )
      errorStop(paste("In quantity ",varNames,": Left and Right must be different"), outputFile)

    if(parameters[4]<=0 || parameters[4]>=1 )
        errorStop(paste("In quantity ",varNames,": Probability must be greater than 0 and smaller than 1"), outputFile)

  }

}


#Read config file and run computation
args<-commandArgs(TRUE)
filename = args[1]

ptm <- proc.time()

fh = file( filename, open='rt' )
line = readLines(fh, n=1 )

if(strsplit(line, "=")[[1]][1]=="version")
{
	version = strsplit(line, "=")[[1]][2]
}else
{
	version = "1.0.1"
}
cat(paste("Conf file version: " , version,"\n"))

if (version =="1.0.2" || version =="1.0.3" || version =="1.0.4" || version =="1.0.5" || version =="1.1" || version =="1.2"|| version =="1.3"|| version =="1.4")
{
	line = readLines(fh, n=1 )
	seed = as.integer(strsplit(line, "=")[[1]][2])
	set.seed( as.integer(strsplit(line, "=")[[1]][2]))
	line = readLines(fh, n=1 )
	nbVar = as.integer(strsplit(line, "=")[[1]][2])
	line = readLines(fh, n=1 )
	nbReal = as.integer(strsplit(line, "=")[[1]][2])
	varNames = NULL
	type=integer(nbVar)
	parameters=as.list(rep(NA,nbVar))
	for(ii in 1:nbVar)
	{
		line = strsplit(strsplit(readLines(fh, n=1 ), "=")[[1]][2],";")[[1]]
		varNames = c(varNames,line[1])
		type[ii]=as.integer(line[2])
		parameters[[ii]] = as.double(line[-(1:2)])
	}

	line = strsplit(substring(readLines(fh, n=1 ),12), ";")[[1]]
	line = line [nchar(line)>0]
	expression=line[length(line)]
	pretreatment=NA
	if(length(line)>1)
		pretreatment=paste(paste(line[1:(length(line)-1)], collapse = ';'),";",sep="")
	line = readLines(fh, n=1 )
	nbOut = 1;
	expressions = {};
	pretreatments = {}
	while( strsplit(line, "=")[[1]][1]=="expression")
	{
		if(nbOut ==1)
		{
			expressions = c(expressions ,expression)
			pretreatments = c(pretreatments ,pretreatment)
		}
		nbOut = nbOut +1;
		line = strsplit(substring(line,12), ";")[[1]]
		line = line [nchar(line)>0]
		expressions = c(expressions ,line[length(line)])
		pretreatment=NA
		if(length(line)>1)
			pretreatment=paste(paste(line[1:(length(line)-1)], collapse = ';'),";",sep="")
		pretreatments = c(pretreatments ,pretreatment)
		line = readLines(fh, n=1 )
	}

	outputFile = strsplit(line, "=")[[1]][2]
	tempout = unlist(strsplit(filename,split="\\."))
	outputFile=tempout[1]
	if(length(tempout)>2)
	  for(iu in 2:(length(tempout)-1))
		outputFile=paste(outputFile,tempout[iu],sep=".")

	#outputFile = paste0(dirname(filename),"/results")
	line = readLines(fh, n=1 )
	symmetrical=FALSE
	if(strsplit(line, "=")[[1]][1]=="symmetrical")
	{
		if(strsplit(line, "=")[[1]][2]=="true")
			symmetrical=TRUE
		line = readLines(fh, n=1 )
	}

	correlation = strsplit(line, "=")[[1]][2]=="true"
	copulaType=NULL
	copulaDf=NULL
	if(correlation == TRUE)
	{
		line = readLines(fh, n=1 )
		copulaType=ifelse(strsplit(line, "=")[[1]][2]=="0", "Gaussian", "Student")
		if(copulaType=="Student")
		{
			line = readLines(fh, n=1 )
			copulaDf = as.double(strsplit(line, "=")[[1]][2])
		}
		line = readLines(fh, n=1 )
		line = as.double(strsplit(line, ";")[[1]][-1])
		correlation = diag(1,nbVar)
		if(nbVar > 1)
		{
			for(ii in 1:(nbVar-1))
			{
				for(ij in (ii+1):nbVar )
				{
					correlation[ii,ij]=line[1]
					correlation[ij,ii]=line[1]
					line=line[-1]
				}
			}
		}

	}
	close(fh)
	if (nbOut == 1)
		try(distrib(nbVar,nbReal,varNames,expression,type,parameters,symmetrical,correlation,outputFile,copulaType,copulaDf,pretreatment))

	if(nbOut > 1)
	{
		for (ii in 1:nbOut)
		{
			set.seed(seed)
			outputfileTemp =paste(outputFile,ii,sep = "")
			expressionTemp = expressions[ii]
			pretreatmentTemp = pretreatments[ii]
			try(distrib(nbVar,nbReal,varNames,expressionTemp,type,parameters,symmetrical,correlation,outputfileTemp,copulaType,copulaDf,pretreatmentTemp))
		}
		try(mergeOutput(outputFile,nbOut))
	}

}
