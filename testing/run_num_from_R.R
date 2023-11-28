
setwd("C:/Users/dtn1/Documents/ByScientist/AntonioPossolo/Num_Nicob/NUM_dev")

commandArgs = function(x) {
  'testing/config.um'
}

source('R/launchscript.R')


K = 1e6
x = rnorm(K, mean=13, sd=7)
y = rnorm(K, mean=9, sd=3)
mean(x < y) ## Prob. that x < y = 30 %
z = sqrt((x^2-y^2)*(x^2 > y^2))
c(mean(z), sd(z), quantile(z, probs=c(0.025, 0.975)))
plot(density(z))

