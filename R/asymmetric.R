######################################################################

## FILE:              asymmetricalUncertainty.R
## AUTHOR:            Antonio Possolo
## MODIFICATION DATE: 2018 Jun 15

######################################################################
## SECTION (PURPOSE) =================================================
######################################################################

## New capability for the NUM: to propagate uncertainties expressed
## asymmetrically.

## WARNING: The NUM should alert the user that when any of the input
## quantities has uncertainty expressed asymmetrically, the
## calculations likely will take a rather long time

## INPUT SPECIFICATION:
## (1) Distribution: Asymmetrical (*)
## (2) Estimate: x
## (3) Left uncertainty: uL
## (4) Right uncertainty: uR
## (5) Effective coverage probability: p

## (*) NOTE: It will be either a skew normal distribution, or a
## generalized extreme value distribution -- selected automatically by
## the NUM

## ASSUMPTIONS:

## (a) The interval (x-uL, x+uR) covers the true value of x with
## probability 0 < p < 1. Common values for p are 68 % (1-sigma) and
## 95 % (2-sigma)

## (b) The probability that the true value of x lies to the left of
## x-uL, and the probability that it lies to the right of
## x+uR, both are equal to (1-p)/2

## APPROACH: Interpret x as the median of a suitable asymmetric
## distribution, and x-uL and x+uR as the 100((1-p)/2)th and
## 100((1+p)/2)th percentiles of the same distribution

## Let L(theta), M(theta), and R(theta) denote the 100((1-p)/2)th,
## 50th, and 100((1+p)/2)th percentiles of the asymmetric distribution
## selected as a model for the uncertainty associated with x. These
## percentiles depend on the value of a generally multidimensional
## parameter theta.

## Choose theta that minimizes

## wL*((x-uL)-L(theta))^2 + wM*(x-M(theta))^2 + wR*((x+uR)-R(theta))^2

## wL, wM, and wR are non-negative weights. A choice that seems to
## work well in general sets wL=4, wM=1, wR=4: this indicates a
## preference for a better fit in the tails at the possible expense of
## a poorer fit in the middle -- a reasonable preference because the
## behavior in the tails has greater influence upon the uncertainty of
## the final result than the behavior in the center of the
## distribution, hence the NUM tries to reproduce the endpoints of the
## interval (x-uL, x+uR) as closely as possible, using model
## percentiles, possibly at the expense of some inaccuracy in
## reproducing the median.

## MODEL SELECTION: We want to relieve the user from having to choose
## a probability distribution for the calculations above. We want to
## make the NUM smart enough to be able to make a reasonable choice on
## its own.

## The key factors determining the selection of a suitable model are:
## (i) Is the distribution skewed to the left or to the right?
## (ii) How marked is the asymmetry?

## Both questions are answered by the ratio uR/uL. If it is larger
## than 1, then skewness is to the right (right tail longer than left
## tail); otherwise skewness is to the left. abs(uR/uL-1) tells how
## marked the asymmetry is.

## The skew normal (SN) model can reproduce the asymmetry
## corresponding only to values of uR/uL fairly close to 1. When this
## is not the case, we revert to a generalized extreme value
## distribution (GEV).

## There is one remaining problem: how to make this work in the
## context of Gauss's formula. The solution is a hack that effectively
## amounts to a simple-minded "symmetrization" of the left and right
## uncertainties, like this:

## Once we have a sample drawn from the selected and fitted
## asymmetrical distribution, we interpret its MAD as standard
## uncertainty associated with the estimate x.

asymmetricalModelSelection = function (x, uL, uR, p, wL=4, wM=1, wR=4,
                                       forceGEV=FALSE)
{
    require(evd)
    require(sn)

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
