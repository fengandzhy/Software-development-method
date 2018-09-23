# Purpose
This project is a practice project built for a researcher to collect data about software development team's feelings for further research. Team members participate in the survey as volunteers. Team members get notifications from us and can submit their and their team's feelings through either the App or Web pages. 

# Architecture Briefs
The server side of the system provides RESTFUL APIs for the Clients (App and Web pages), using node.js and express.js. The notifications are sent out in Cron jobs. However, as the notification time schedule can be changed by through web APIs, Cron processes communicate with web request processor processes using message queues.

# What we have learned from this project
Scrum and TDD are adopted in this project. With TDD, it's very convenient to refactor our code at any time, as test cases give us the confidence that everything is still working as they are supposed to be. 
