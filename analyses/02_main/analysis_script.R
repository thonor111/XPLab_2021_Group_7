library(brms)
library(ordinal)
library(tidyverse)
library(rstan)
library(bridgesampling)
library(shinystan)

#import clean data
fulldata <- read.csv("clean_data.csv")
data <- read.csv("short_data.csv")

source("functions/produce_mean_and_count_bar_plot.R")
barplot <- produce_mean_and_count_bar_plot(fulldata, bar_width_means=0.5, bar_width_response=0.3)
ggsave(file="barplot.png", plot=barplot, width=190, height = 110, units="mm")
source("functions/issue_plot.R")
issueplot <- issue_plot(data)
ggsave(file="issueplot.png",plot = issueplot, width=300, height = 110, units="mm")


fit_brms_one <- rstan::stan(
  # where is the Stan code
  file = 'model_one.stan',
  # data to supply to the Stan program
  data = data,
  # how many iterations of MCMC
  iter = 20000,
  # how many warmup steps
  warmup = 2000
)
fit_brms_two <- rstan::stan(
  # where is the Stan code
  file = 'model_two.stan',
  # data to supply to the Stan program
  data = data,
  # how many iterations of MCMC
  iter = 20000,
  # how many warmup steps
  warmup = 2000
)

marg_modelone <- bridgesampling::bridge_sampler(marg_modelone, silent = T)
marg_modeltwo <- bridgesampling::bridge_sampler(marg_modeltwo, silent = T)
bridgesampling::bf(marg_modelone, marg_modeltwo)