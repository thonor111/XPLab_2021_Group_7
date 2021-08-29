issue_plot <- function(data) {
plot <- ggplot(data, aes(         x= topIssue,
                                  y = topIssueRating, 
                                  colour = factor(topIssue),
                                  fill = factor(topIssue))) + 
  geom_dotplot(binaxis = "y", stackdir = "center", binwidth = 0.15) +
  labs(x = "Issue", y="Agreement") + 
  guides(color=FALSE, fill=FALSE)+
  scale_y_continuous(breaks=c(0,5,10), labels = c("Strongly disagree", "Neutral", "Strongly agree"))
return(plot)
}