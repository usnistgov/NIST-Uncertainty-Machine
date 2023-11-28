######################################################################
## SECTION (SPECIFICATION) ===========================================
######################################################################
## Function drawDistrib and drawDistribCorel:
## Function drawing from the specified distribtutions with or without correlation
## =======================
## SPECIFICATION -- INPUTS

## (type) List of integer corresponding to the Names of the families of
## probability distributions to be assigned to the input quantities
## selected from drop-down menus that include the families
## of distributions specified under SPECIFICATION -- DISTRIBUTIONS


## (parameters) Values of parameters sufficient to determine particular
## elements of the families of distributions selected in (I2) --
## refer to SPECIFICATION -- PARAMETERS for details on how this
## is to be done

## (varNames) Names of input variables

## (varEnv) A safe Environment to limit the authorized functions

## (errorFile) The name of an output file where to save the data in case of error

## (ii) the current input quantity to draw from

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
	  Shape1 = parameters[[ii]][1]
	  Shape2 = parameters[[ii]][2]
	  varTemp=rbeta(nbReal, shape1=Shape1, shape2=Shape2)
	  meanX = Shape1/(Shape1+Shape2)
	  sdX = sqrt(Shape1*Shape2/(((Shape1+Shape2)^2)*(Shape1+Shape2+1)))
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
			sdX = parameters[[ii]][2]

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

	if (type[ii]==22) ## Beta (Shape1, Shape2, Left, Right)
	{
	  checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
	  Shape1 = parameters[[ii]][1]
	  Shape2 = parameters[[ii]][2]
	  Left = parameters[[ii]][3]
	  Right = parameters[[ii]][4]
	  varTemp = Left + (Right-Left) *
	    rbeta(nbReal, shape1=Shape1, shape2=Shape2)
	  meanX = Left + (Right-Left) * Shape1/(Shape1+Shape2)
	  sdX = (Right-Left) * sqrt(Shape1*Shape2 /
	                              (((Shape1+Shape2)^2) * (Shape1+Shape2+1)))
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
	
	if(type[ii]==27) ## Binomial (Size, Probability)
	{
	  checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
	  varTemp=rbinom(nbReal, size=parameters[[ii]][1], prob=parameters[[ii]][2])*1.0
	  meanX = parameters[[ii]][1]*parameters[[ii]][2] # N*p
	  sdX   = sqrt(parameters[[ii]][1]*parameters[[ii]][2]*(1 - parameters[[ii]][2])) #sqrt(N*p*(1-p))
	}
	
	if(type[ii]==28) ## Negative Binomial (Mean, Dispersion)
	{
	  checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
	  mu = parameters[[ii]][1]
	  phi = parameters[[ii]][2]
	  varTemp=rnbinom(n=nbReal, size=phi, mu=mu)*1.0
	  meanX = mu
	  sdX   = sqrt(mu*(1+mu/phi))
	  remove(mu,phi)
	}
	
	if(type[ii]==29) ## Poisson (rate)
	{
	  checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
	  lambda = parameters[[ii]][1]
	  varTemp=rpois(n=nbReal, lambda=lambda)*1.0
	  meanX = lambda
	  sdX   = sqrt(lambda)
	  remove(lambda)
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
	  Shape1 = parameters[[ii]][1]
	  Shape2 = parameters[[ii]][2]
	  varTemp=qbeta(z[,ii], shape1=Shape1, shape2=Shape2)
	  meanX = Shape1/(Shape1+Shape2)
	  sdX = sqrt(Shape1*Shape2/(((Shape1+Shape2)^2)*(Shape1+Shape2+1)))
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
			sdX = parameters[[ii]][2]

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
	if (type[ii]==22) ## Beta (Shape1, Shape2, Left, Right)
	{
	  checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
	  Shape1 = parameters[[ii]][1]
	  Shape2 = parameters[[ii]][2]
	  Left = parameters[[ii]][3]
	  Right = parameters[[ii]][4]
	  varTemp = Left + (Right-Left) *
	    qbeta(z[,ii], shape1=Shape1, shape2=Shape2)
	  meanX = Left + (Right-Left) * Shape1/(Shape1+Shape2)
	  sdX = (Right-Left) * sqrt(Shape1*Shape2 /
	                              (((Shape1+Shape2)^2) * (Shape1+Shape2+1)))
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
	if(type[ii]==27) ## Binomial (Size, Probability)
	{
	  checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
	  varTemp=qbinom(z[,ii], size=parameters[[ii]][1], prob=parameters[[ii]][2])*1.0
	  meanX = parameters[[ii]][1]*parameters[[ii]][2] # N*p
	  sdX   = sqrt(parameters[[ii]][1]*parameters[[ii]][2]*(1 - parameters[[ii]][2])) #sqrt(N*p*(1-p))
	}
	if(type[ii]==28) ## Negative Binomial (Mean, Dispersion)
	{
	  checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
	  mu = parameters[[ii]][1]
	  phi = parameters[[ii]][2]
	  varTemp=qnbinom(z[,ii], size=phi, mu=mu)*1.0
	  meanX = mu
	  sdX   = sqrt(mu*(1+mu/phi))
	  remove(mu,phi)
	}
	if(type[ii]==29) ## Poisson (rate)
	{
	  checkParam(type[ii],parameters[[ii]],varNames[ii],errorFile)
	  lambda = parameters[[ii]][1]
	  varTemp=qpois(z[,ii], lambda=lambda)*1.0
	  meanX = lambda
	  sdX   = sqrt(lambda)
	  remove(lambda)
	}
	
	
	varEnv$varTemp=varTemp
	eval(parse(text=paste(varNames[ii], "=varTemp",sep="")),envir = varEnv)


	res <- list("meanX"=meanX,"sdX"=sdX)
	return(res)
}
