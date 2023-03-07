# A Machine Maintenance Website

### Brief Description
- A course project for Cloud Computing Theory and Practice
- This simple website utilizes Mern Stack to make a machine maintenance platform containing a complete function of CRUD (Create, Read, Update, DELETE). In this project, I use the EC2 service standing NGNIX server provided by the AWS platform and stored data with AWS RDS service (AWS MySQL).In addition, the system sends an email regularly to notify the maintenance personnel.

### FramEwork
- Frontend : Reactjs
- Backend : Express (NodeJs)

### Database
- AWS MySQL

### Ifrastructure
- AWS EC2 (Amazon Linux2 AMI (HVM) - Kernal 5.10, SSD)

### Npm package for frontend
- React-Bootstrap
- React-Router-Dom
- Axios 
- Formik 
- Yup
- forever 

### Npm Package for backend
- cors
- parser
- express
- mysql
- nodemon
- node-schedule
- nodemailer
- dotenv
- forever

### RESTful API
REST API | URL                           | CRUD
---------|-------------------------------|-----
GET      |http://localhost:3000/machine  |Read
GET      |/machine/update-student/id     |Read
POST     |/machine/create-student        |Post
PUT      |/machine/update-student/id     |Update
DELETE   |/machine/delete-student/id     |Delete

### System Architecture Figure
![image](https://github.com/KartaYu/Machine-Maintenance-Website/blob/main/Pic/System%20Flow.png)

### ScreenShot
- Create a maintenance table page.(The content of form includes the name of the machine, the name of the person in charge, the date of starting and ending, the check cycle, and the email address)

![image](https://github.com/KartaYu/Machine-Maintenance-Website/blob/main/Pic/Form_Page.png)

-This page is the current maintenance list. The record can be modified by the green button and deleted by the red button.

![image](https://github.com/KartaYu/Machine-Maintenance-Website/blob/main/Pic/List%20of%20Record.png)

- Email notification

![image](https://github.com/KartaYu/Machine-Maintenance-Website/blob/main/Pic/Mail%20Notification.png)

### Video Demo
https://tinyurl.com/2p897k5u
