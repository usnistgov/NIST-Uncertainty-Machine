# NIST Uncertainty Machine
![NIST](https://nccoe.nist.gov/sites/all/themes/custom/nccoe2x/asset/img/NIST_logo.svg)

The NIST Uncertainty Machine https://uncertainty.nist.gov is a Web-based
application to evaluate the measurement uncertainty associated
with an output quantity defined by a measurement model of the form
y = f (x1 , ... , xn
), where the real-valued function f is specified fully and explicitly,
and the input quantities are modeled as random variables whose joint
probability distribution also is specified fully.

The NIST Uncertainty Machine evaluates measurement uncertainty by application of both Gauss’s Formula and the Monte Carlo Method.


## Manual
[PDF available here](https://uncertainty.nist.gov/NISTUncertaintyMachine-UserManual.pdf)

## Requirements
* R version 3.0+
* Web server suporting PHP 6+
* jQuery v3+ (version jQuery v3.1.1 included)

## Installation
Copy the content of the repository to the root of the website.

Run the following command in R to install the required R packages.
```R
install.packages(c('truncnorm','triangle','nleqslv','mvtnorm','numDeriv','evd','sn'), repos='http://cran.rstudio.com/')
```

The web server must have writing access to the ```UserData``` folder.

`Rscript` must be in the PATH or be specified on line 11 of `validation.php`and on line 7 of `rdtotxt.php`

In some case (especially when entering samples instead of specifying distributions) the POST data can be big, we recommend the following setting in `php.ini`
 `post_max_size = 16M`

 Changing 	```$debug``` to ```TRUE``` in ```validation.php``` can start debug mode which display more information relative to the computation.

## Changelog
### version 1.4 - 2018-10-23
  - New single window interface
  - Improved usr workflow
  - Added the codemirror library to add features like syntax highlighting and bracket matching  
  - Added support for the new asymmetric distribution using skew normal distribution, or a generalized extreme value distribution.
  - Refactoring of the R code
  - Updated Manual

### version 1.3.5 - 2018-04-23
  - New interface with NIST header and footer
  - Added verification script [available here](https://uncertainty.nist.gov/verification.php)
  - Improved reproducibility of the results
  - Updated Manual


### version 1.3.4 - 2017-09-27
  - Add a complex step to the gradient computation in case the regular gradient fails
  - Removal of the update quantity name button, everything is now updating continuously as the user types the new names.
  - In case of a not computable gradient for the gauss formula the app still displays the results and density function of the monte carlo simulation
  - Add a reset button
  - Add a version number to the css and js files so that user browsers don’t use old cached version when there is an update
  - Changing the number of inputs now doesn’t erase all the inputs quantity which were already entered
  - Added a drop down menu in the information zone to quickly load examples
  - Unified the end of lines of the R generated text files. (now it doesn’t matter if the R server is on linux or windows the generated text files use CRLF “\r\n” as their end of line delimiter.    

### version 1.3
  - Descriptive legend added to the density plot
  - Added the possibility to load samples values instead of specifying a distribution
  - More function available in the output quantity calculation (matrix, solve, mapply, uniroot ...)
  - Fixed a rarely occurring bug with the number of output by making this number a JavaScript variable instead of a hidden form field
  - Added a warning when the user provide a sample file which is pdf xls or xlsx explaining that it requires a text file (advising csv)
  - Added a minimum lifetime for the user data to remain on disk (to prevent data being deleted when under high usage)
  - Creation of a different colored favicon icon for the input page and the result page of the app
