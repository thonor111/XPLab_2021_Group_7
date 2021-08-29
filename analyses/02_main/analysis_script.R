library(brms)
library(ordinal)
library(tidyverse)
library(rstan)
library(bridgesampling)
library(shinystan)

#import clean data
fulldata <- read.csv("clean_data.csv")

# plot the means in a bar plot
source("functions/produce_mean_and_count_bar_plot.R")
barplot <- produce_mean_and_count_bar_plot(fulldata, bar_width_means=0.5, bar_width_response=0.3)
ggsave(file="barplot.png", plot=barplot, width=190, height = 110, units="mm")

# plot the chosen issues and their rating
source("functions/issue_plot.R")
issueplot <- issue_plot(fulldata)
ggsave(file="issueplot.png",plot = issueplot, width=300, height = 110, units="mm")

# data as list for stan models
data_list <- as.list(c(fulldata, N = dim(fulldata)[1]))

# fit the first model, the alternative model
fit_brms_one <- rstan::stan(
  # where is the Stan code
  file = 'herding.stan',
  # data to supply to the Stan program
  data = data_list,
  # how many iterations of MCMC
  iter = 20000,
  # how many warmup steps
  warmup = 2000
)

# fit the second model, the self-categorization model
fit_brms_two <- rstan::stan(
  # where is the Stan code
  file = 'SCT.stan',
  # data to supply to the Stan program
  data = data_list,
  # how many iterations of MCMC
  iter = 20000,
  # how many warmup steps
  warmup = 2000
)

# calculate marginal likelihood and from that compute the bayes factor
marg_alternative_model <- bridgesampling::bridge_sampler(fit_brms_one, silent = T)
marg_SCT_model <- bridgesampling::bridge_sampler(fit_brms_two, silent = T)
bridgesampling::bf(marg_alternative_model, marg_SCT_model)

#Create prior-posterior plots-------
source("plot_priors_posteriors.R")