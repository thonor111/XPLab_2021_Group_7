library(brms)
library(ordinal)
library(tidyverse)
library(rstan)
library(bridgesampling)
library(shinystan)

# import clean data
fulldata <- read.csv("clean_data.csv")
# give summary of data (optional)
#write.csv(summary(fulldata),"summary_data.csv")

# plot the means in a bar plot
source("functions/produce_mean_and_count_bar_plot.R")
barplot <- produce_mean_and_count_bar_plot(fulldata, bar_width_means=0.5, bar_width_response=0.3)
ggsave(file="barplot.png", plot=barplot, width=190, height = 110, units="mm")

# plot the chosen issues and their rating
source("functions/issue_plot.R")
issueplot <- issue_plot(fulldata)
ggsave(file="issueplot.png",plot = issueplot, width=500, height = 110, units="mm")

# run an additional frequentist analysis with cumulative link model
ordinal <- clm(as.factor(response)~ingroupNorm*bothShown, data=fulldata)
summary(ordinal)



# fit the data, then Compare the alternative model with the chosen SCT model (can be given for fit_brms_two in file) 
# using bayes factor on the marginal likelihood 
  
# data as list for stan models
data_list <- as.list(c(fulldata, N = dim(fulldata)[1]))

# fit the first model, the alternative model
fit_brms_one <- rstan::stan(
  # where is the Stan code
  file = "stan_models/herding.stan",
  # data to supply to the Stan program
  data = data_list,
  # how many iterations of MCMC
  iter = 10000,
  # how many warmup steps
  chains=4,
  seed=123,
  control=list(adapt_delta = 0.99)
)

# fit the second model, the self-categorization model
fit_brms_two <- rstan::stan(
  # where is the Stan code
  file = "stan_models/SCT.stan",
  # data to supply to the Stan program
  data = data_list,
  # how many iterations of MCMC
  iter = 10000,
  # how many warmup steps
  chains=4,
  seed=123,
  control=list(adapt_delta = 0.99)
)

# calculate marginal likelihood and from that compute the bayes factor
marg_alternative_model <- bridgesampling::bridge_sampler(fit_brms_one, silent = T)
marg_SCT_model <- bridgesampling::bridge_sampler(fit_brms_two, silent = T)
bridgesampling::bf(marg_alternative_model, marg_SCT_model)

#Create prior-posterior plots-------
source("plot_priors_posteriors.R")