#Ticketing System

#FrontEnd:

Technologies: React, Redux, Redux thunk, lodash, axios, bootstrap, reactstrap, recathooks, cryptojs...

#Login Page
	User will enter the email and password. After success it will redirect to dashboard page.

#Dashboard
	User can list of created tickets by him. If admin he can see all tickets.

#Header
	In Header It will shows a logo, user name and menu. In menu user can see Dashboard, create ticket and logout. Admin can see Create User and User List

#Create Ticket
	User can create the ticket. If user didn't enter any filed it will alerts to enter all fields.

#Ticket details
	If user clicks on ticket ID in dashboard page it will redirect to detail page and show about ticket indeatil. Here admin can change the status. User can make the comment but he can’t change the status.

#Create user
	Admin only can create users. Due to lack of time we didn't create user update page

#Users List
	Admin only can view the users list.

#Backend

Technologies: Node js, Express, cryptojs

Create Rest Apis in Node js using Node express with two (Users, Tickets) controllers and models.

Hosting on port 5000.
Base Path: http://localhost:5000/api/

		

#Database

Technologies: MongoDB on Azure
In this database we created two collections (User and tickets) and storing the Data.

Hosted on cloud database with url mongodb+srv://test:test@cluster0-wys22.mongodb.net/test?retryWrites=true&w=majority



#User details

Admin Role
Email: admin@helpdesk.com
Password: admin

User Role
Username: user@helpdesk.com
Password: user

Note: Due to lack of time some comments, coding standards not maintained well.

If any queries feel free to contact me.

