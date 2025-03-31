![](https://nccoe.nist.gov/sites/all/themes/custom/nccoe2x/asset/img/NIST_logo.svg)

# NIST Uncertainty Machine

 [Click here to download a copy of the User's Manual.](./NISTUncertaintyMachine-UserManual.pdf)

The NIST Uncertainty Machine is a web-based software application produced by the National Institute of Standards and Technology ([NIST](https://www.nist.gov)) to evaluate the measurement uncertainty associated with a scalar or vectorial output quantity that is a known and explicit function of a set of scalar input quantities for which estimates and evaluations of measurement uncertainty are available.

The NIST Uncertainty Machine implements the approximate method of uncertainty evaluation described in the "Guide to the expression of uncertainty in measurement" (GUM), and the Monte Carlo method of the GUM Supplements 1 and 2. Input and output quantities are modeled as random variables, and their probability distributions are used to characterize measurement uncertainty. For inputs that are correlated, the NIST Uncertainty Machine offers the means to specify the corresponding correlations, and the manner in which they will be taken into account.

The output of the NIST Uncertainty Machine comprises:

 * An estimate of the output quantity (measurand)
 * Evaluations of the associated standard and expanded uncertainties
 * Coverage intervals for the true value of the measurand
 * An uncertainty budget that quantifies the influence that the uncertainties of the inputs have upon the uncertainty of the output

For details about the NIST Uncertainty Machine, and examples of its application, please refer to its user's manual, and to T. Lafarge and A. Possolo (2015) "The NIST Uncertainty Machine", NCSLI Measure Journal of Measurement Science, volume 10, number 3 (September), pages 20-27.

NIST is the national metrology institute of the United States of America. Visit us at [www.nist.gov](https://www.nist.gov). Founded in 1901, NIST is a non-regulatory federal agency within the U.S. Department of Commerce. NIST's mission is to promote U.S. innovation and industrial competitiveness by advancing measurement science, standards, and technology in ways that enhance economic security and improve our quality of life.

Bug reports and suggestions for improvement are most welcome: please send them to [antonio.possolo@nist.gov](mailto:antonio.possolo@nist.gov).


## Instructions

* Select the number of input quantities.
* Change the quantity names if necessary.
* For each input quantity choose its distribution and its parameters.
* Choose and set the correlations if necessary.
* Choose the number of realizations.
* Write the definition of the output quantity in a valid R expression.
* Run the computation.

## Acknowledgements

The authors of the NIST Uncertainty Machine -- Thomas Lafarge, David Newton, Amanda Koepke, and Antonio Possolo -- thank Carlo Carobbi and Francesca Bonacorsi (Università degli Studi di Firenze, Florence, Italy) for detecting an error in the engine of the NIST Uncertainty Machine (NUM), and for kindly alerting us to it. The authors are also particularly indebted to David Duewer (NIST) for offering valuable suggestions for improvement, and are grateful to all the users of the NUM throughout the world for their interest in this application, and for their suggestions and comments. Thanks to Nick Lyons for UX suggestions and improvements.

## Validation & Verification R Script

`FullScriptNUM.R` is an R script intended to be run locally when the user feels the need to validate, verify, or reproduce results obtained by the "NIST Uncertainty Machine" (NUM).
More detailed information is available in the [User's manual Chapter 6]("./NISTUncertaintyMachine-UserManual.pdf#page=17").

Passing a configuration file produced by the NUM as an argument to `FullScriptNUM.R`, produces the same results as when the same configuration file is loaded into the web application and run there.

Suppose the configuration file is called `NUMConfigExample.um`. The script can be run with the following command:

`$ Rscript FullScriptNUM.R NUMConfigExample.um`


The script will generate 3 files with the same prefix as the configuration file. In the case of the example above, the output files would be:

* `NUMConfigExample-result.txt`, a plain text file with the same results and layout of the numerical results shown on the NUM's output Web page;
* `NUMConfigExample-density.jpg`, a JPEG file with the same plot that is displayed on the NUM's output Web page, showing the graphs of two probability densities;
* `NUMConfigExample-value.Rd`, a binary R data file with the replicates of the input quantities, and with the corresponding values of the output quantity, corresponding to the Monte Carlo method of the GUM Supplement 1. In R, the command `load('NUMConfigExample-values.Rd')` will create as many vectors as there are input quantities, with their names as specified in the configuration file, and a vector named "y" with the values of the output quantity.

The script will install any necessary R packages that may not have been previously installed in the local version of the R system. The script first writes its version number onto the terminal window, which should be matched to the version of the NUM displayed at the top of the page of the web application.

The script will install any necessary R packages that may not have been previously installed in the local version of the R system. The script first writes its version number onto the terminal window, which should be matched to the version of the NUM displayed at the top of the page of the web application.

### Download
  *   [NIST Validation & Verification Script Version 1.5](./FullScriptNUM/FullScriptNUM_1.5.R)
  *   [NIST Validation & Verification Script Version 1.4.2 & 1.4.3](./FullScriptNUM/FullScriptNUM_1.4.2.R)
  *   [NIST Validation & Verification Script Version 1.4](./FullScriptNUM/FullScriptNUM_1.4.R)
  *   [NIST Validation & Verification Script Version 1.3.6](./FullScriptNUM/FullScriptNUM_1.3.6.R)
  *   [NIST Validation & Verification Script Version 1.3.5](./FullScriptNUM/FullScriptNUM_1.3.5.R)
  *   [NIST Validation & Verification Script Version 1.3.4](./FullScriptNUM/FullScriptNUM_1.3.4.R)
