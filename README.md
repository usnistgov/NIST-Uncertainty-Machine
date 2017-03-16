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
install.packages(c('truncnorm','triangle','nleqslv','mvtnorm','numDeriv'), repos='http://cran.rstudio.com/')
```

The web server must have writing access to the ```UserData``` folder.

`Rscript` must be in the PATH or be specified on line 24 of `validation.php`and on line 7 of `rdtotxt.php`

In some case (especially when entering samples instead of specifying distributions) the POST data can be big, we recommend the following setting in `php.ini`
 `post_max_size = 16M`

 Changing 	```$debug``` to ```TRUE``` in ```validation.php``` can start debug mode which display more information relative to the computation.
