# Introduction
[README in Chinese](README.md)
## Technology
Express+MySQL+ReactNative
## application main function
Recording the happiness of a team members through voice input
## Details Introduction
* Purpose：This project is a practice project built for a researcher to collect data about software development team's feelings for further research. <br>
		   Team members participate in the survey as volunteers. Team members get notifications from us and can submit their and their team's feelings through either the App or Web pages.
* Technology Introduction: The server side of the system provides RESTFUL APIs for the Clients (App and Web pages), using node.js and express.js. <br> 
						   Notifications are sent out in Cron jobs. However, as notification time schedule can be changed through web APIs, Cron processes communicate with web request processor processes using message queues.
* Summary: Scrum and TDD are adopted in this project. With TDD, it's very convenient to refactor our code at any time, as test cases give us the confidence that everything is still working as they are supposed to be.


