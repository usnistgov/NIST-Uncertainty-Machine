######################################################################
## SECTION (SPECIFICATION) ===========================================
######################################################################
## Function checkParam:
## Function checking the validity of the parameters of each input quantity
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

## (outputFile) The name of an output file where to save the data in case of error

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
		if(parameters[3]<=0)
			errorStop(paste("In quantity ",varNames,": No. of degrees of freedom must be positive"), outputFile)
		if(parameters[3]<=2 && parameters[3]>0 )
			errorStop(paste("In quantity ",varNames,": Student's t distribution with ", parameters[3], " degrees of freedom has infinite variance"), outputFile)

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
					  ": The mean must be positive"),
				outputFile) }
		if(tau<=0) {
			errorStop(
				paste("In quantity ", varNames,
				": StdDev must be positive"),
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
				": The number of sample must be smaller than 100 000"),
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
