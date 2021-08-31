# stanmmodelpath couldn't be found using this function
fit_model_and_compute_bayes_factor <- function(data, stanmodelpath)

# data as list for stan models
data_list <- as.list(c(data, N = dim(data)[1]))

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
  file = stanmodelpath,
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