issue_plot <- function(data) {
plot <- ggplot(data, aes(x=factor(topIssue, labels = c("Gun \n control", 
                                                             "Feminism", 
                                                             "Joe \n Biden", 
                                                             "Immigration",
                                                             "Transgender \n rights",
                                                             "Drug \n legalization",
                                                             "The Black Lives \n Matter movement",
                                                             "Climate \n change",
                                                             "Religion \n Tax")),
                                  y = topIssueRating, 
                                  colour = factor(topIssue),
                                  fill = factor(topIssue))) + 
  geom_dotplot(binaxis = "y", stackdir = "center", binwidth = 0.15) +
  labs(x = "Issue", y="Agreement") + 
  guides(color=FALSE, fill=FALSE)+
  scale_y_continuous(breaks=c(0,5,10), labels = c("Strongly disagree", "Neutral", "Strongly agree"))
return(plot)
}