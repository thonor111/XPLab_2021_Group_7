produce_mean_and_count_bar_plot <- function(df, bar_width_means=0.5, bar_width_response=0.4,   arrow_length = 0.4){
  #--Find the higher response proportion so that I can rescale the other proportions relative to that. 
  response_counts = group_by(df, ingroupNorm, bothShown, response)%>%
    summarize(count = length(response))%>%ungroup()
  max_response_count <- max(response_counts)
  #--Set the dimensions of rectangles to add in to plot representing proportions of responses
  props <- group_by(df, ingroupNorm, bothShown, response) %>%
    summarize(count = length(response), 
              relative_proportion = count/max_response_count,
              xmin = ingroupNorm[1] - bar_width_means/1.5,
              xmax = xmin + relative_proportion*bar_width_means,
              ymin = response[1] - bar_width_response, 
              ymax = response[1] + bar_width_response) %>%ungroup()
  props$bothShown = factor(props$bothShown, labels=c("Only ingroup norm shown", "Both norms shown"))
  
  
  #--Find mean responses for each condition
  means <- group_by(df, ingroupNorm, bothShown) %>%
    summarize(meanResponse = mean(response),
              stdErrResponse = sd(response)/sqrt(length(response)),
              boundLower = meanResponse - stdErrResponse,
              boundUpper = meanResponse + stdErrResponse
    ) %>% ungroup()
  means$bothShown = factor(means$bothShown, labels=c("Only ingroup norm shown", "Both norms shown"))
  
  #--Set positions of some arrows to represent the different theories' predictions
  # arrows <- rbind(data.frame(means, theory=0), data.frame(means, theory=1)) %>%
  #   mutate(arrowx = ingroupNorm + bar_width_means/1.3 + theory/10,
  #          arrowxend = arrowx,
  #          arrowy = meanResponse,
  #          arrowyend = ifelse(ingroupNorm==0 & theory==0, arrowy - arrow_length ,
  #                             ifelse(ingroupNorm==0 & theory==1, arrowy + arrow_length ,
  #                                    ifelse(ingroupNorm==1 & theory==0,arrowy + arrow_length , arrowy - arrow_length))),
  #          arrowAlpha = ifelse(bothShown=="Both norms shown", 0, 1))
  
  
  library(scales) #Needed to give rescale_none function to oob. 
  return_plot <- ggplot()+
    geom_col(data=means, aes(x=ingroupNorm, y=meanResponse, fill=factor(ingroupNorm)), width=bar_width_means, alpha=0.5) +
    geom_rect(data=props, aes(xmin=xmin, ymin=ymin, xmax=xmax, ymax=ymax, group=ingroupNorm), fill = "#9c9d9e", alpha = 0.8) +
    scale_y_continuous(name="Preference", limits=c(1,6), oob = rescale_none, breaks = 1:6, labels=c("Definitely \n Report", "","","","", "Definitely \n leave alone")) + 
    scale_x_continuous(name = "Ingroup Norm", breaks=c(0,1), labels=c("Report", "Not Report"))+
    scale_fill_manual(breaks = c(0, 1), labels=c("Report", "Not Report"), values = c("#3148f7", "#35b5ff")) +
    facet_wrap(~bothShown) + 
    #geom_segment(data=arrows, aes(x = arrowx, xend = arrowxend, y = arrowy, yend = arrowyend, colour = factor(theory), alpha=arrowAlpha), size=2, arrow=arrow(length=unit(0.2, "inches"))) +
    #scale_colour_manual(name = "Predicted change when \nboth norms shown", labels = c("Self-categorization", "Herding"), values = c("#6c278e", "#9bea7e")) +
    scale_alpha(range = c(0, 1)) +
    theme(panel.spacing = unit(4, "lines"),
          strip.text = element_text(size = 14),
          panel.spacing.x = unit(3, "cm")) +
    guides(fill=FALSE, group=FALSE, alpha=FALSE)
  return(return_plot)
}