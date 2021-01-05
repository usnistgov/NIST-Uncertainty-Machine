######################################################################
## SECTION (SPECIFICATION) ===========================================
######################################################################
## Function distrib:
## Main function of the Uncertainty propagation
## =======================
## SPECIFICATION -- INPUTS

## (nbVar) Number of variables x0, x1, ..., xn
##

## (nbReal) Number of samples to draw from the joint probability
## distribution of the input quantities

## (varNames) Names of input variables

## (expression) Formula written in R that expresses an output quantity y
## as a function of nbVar input quantities x0, x1, ..., xn

## (type) List of integer corresponding to the Names of the families of
## probability distributions to be assigned to the input quantities
## selected from drop-down menus that include the families
## of distributions specified under SPECIFICATION -- DISTRIBUTIONS


## (parameters) Values of parameters sufficient to determine particular
## elements of the families of distributions selected in (I2) --
## refer to SPECIFICATION -- PARAMETERS for details on how this
## is to be done

## (correlation) The correlation coefficients
## between all pairs of input quantities

## (outputFile) The name of an output file where to save the data

## (copulaType) and (copulaDf) If box (correlation) is ON, then specification of a copula that
## defines a joint probability distribution for the input

## (pretreatment) aditional treatment for evaluation of the output quantity

# Specify an extra library location where the needed library are installed example: extraLibLoc="~/Rlib"
extraLibLoc=NULL
if (!is.null(extraLibLoc))
	.libPaths(c(.libPaths(),extraLibLoc))

# Specify the device type as cairo on unix server to avoid using xlib
deviceType=NULL
if(!is.null(getOption("bitmapType")) && capabilities("cairo"))
	deviceType = "cairo"

require(methods)
truncnormL = require(truncnorm)
triangleL = require(triangle)
nleqslvL = require(nleqslv)
mvtnormL = require(mvtnorm)
numDerivL = require(numDeriv)
parallelL = require(parallel)
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

signifDigits = function (x, y)
{
	n = 1
	if(x==y)
		return(Inf)
	while (signif(x, n) == signif(y, n)) {n = n + 1}
	return(n-1)
}

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
	
	if(sigma == 0) { # e.g. discrete distributions with low variance
	  stat.signif = 1
	} else {
	  stat.signif = floor(log10(abs(ys/(k*sigma))))
	}
	

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

	#Check for asymmetric distribution
	if(any(type==26))
	{
		evdL = require(evd)
		snL = require(sn)
		source("R/asymmetric.R")
	}

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
	if (exists("evdl") && !evdL)
		errorStop("Impossible to load the package evd",errorFile)
	if (exists("snL") && !snL)
		errorStop("Impossible to load the package sn",errorFile)

	## (COMP-03) Verify that the user has specified a positive
	## integer (m) for the size of the Monte Carlo sample.
	if(nbReal<0)
		errorStop("Negative number or realizations\n",errorFile)

	if(nbReal>5000000)
		errorStop("Number of realizations too big, maximum allowed is 5 000 000\n",errorFile)

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
		cat("\nY values saved in file:  ",outputFile,"\n")
		cat("Results saved in file:   ",outputFile2,"\n")
		cat("Y Density saved in file: ",outputFile3,"\n")
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
			writeThread =	mcparallel(save(y,file = outputFile))
		else
			save(y,file = outputFile)
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
