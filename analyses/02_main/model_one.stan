data {
    int<lower=1> N;
    int<lower=0,upper=1> ingroupNorm;
    int<lower=0,upper=1> outgroupNorm ;
    int<lower=0,upper=1> bothShown ;
    int<lower=1,upper=7> response ;
}

parameters {
    real<lower=0> bIn;
    real bBoth;
}
transformed parameters{
  real<lower=0> bOut = -0.85 / 0.6 * bIn;
}
model{
    // priors
    bIn ~ normal( 0.6/0.75 * 1.02 , 0.5 );
    bBoth ~ normal( 0 , 0.5 );
    // likelihood
    for (i in 1:N)
    response = bIn * ingroupNorm + bBoth * bothShown + bOut * ingroupNorm * bothShown
    }