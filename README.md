# BLOGS

### Introduction
This project enables the user to create their article and post it and add comments if needed. User can view posts from other users and comment on their posts as well. There is a separate admin panel which allows the admin to monitor the different users and delete the user if needed.

### Usage
- Initially clone the repository and go to the backend folder
- `cd backend`
- Install the required dependancy via 
- `npm install`
- Run the appliction via 
- `npm start`
- Go to `http://localhost:5000` to access the app
### Dependency
The different packages used are
- **bcryptjs** Used for hashing of password
- **chai** Used for unit testing
- **chai-http** Used for api unit testing
- **dotenv** Used for config files
- **express** Used for server creation
- **express-session** Used for creating sessions
- **flash** Popup messages
- **mocha** Test framework
- **mongoose** Used for mongodb connection
- **multer** Middleware for handling multipart/form-data
- **multer-gridfs-storage** Used in storing files in Mongodb
- **passport** Used for login and authentication
- **passport-local** Used for getting local strategy for passport
- **passport-google-oauth20** Provided auth by Google
- **slugify** Used for better url id creation
- **supertest** Library for testing HTTP servers
- **nodemon** *Dev dependency* Reloads the app whenever a change is done
- **passport-facebook** Provided auth by Google
- **passport-github** Provided auth by Github


### Models
Different models have been used to save the data in the database
- adminModel
- articleModel
- commentsModel
- userModel

### Views
- **Login/Register Screen** First page for user to login or register
- **Homepage** Main Homepage showing all the articles on the website
- **Article-Read More** Page showing the full article
- **Article-Comments** Page to see Comments on the articles
- **New Article** Page to add new Articles
- **My Articles** Page to see all articles written by a user
- **My Comments** Page to see all comments made by a user


### Screenshots
**Homepage**
-![Homepage](/Blogs-Images/inside-allarticles.png)



**Comments**
-![Comments](/Blogs-Images/inside-comments.png)
<br/>
<br/>
<br/>

**My Articles**
-![My Articles](/Blogs-Images/inside-myarticle.png)
<br/>
<br/>
<br/>

**My Comments**
-![My Comments](/Blogs-Images/inside-mycomments.png)
<br/>
<br/>
<br/>


**New Article**
-![New Article](/Blogs-Images/inside-newarticle.png)
<br/>
<br/>
<br/>


**Full Article**
-![Full Article](/Blogs-Images/inside-readmore.png)
<br/>
<br/>
<br/>

**Admin**
-![Admin](/Blogs-Images/admin.png)
<br/>
<br/>
<br/>


**Login**
-![Login](/Blogs-Images/login.png)
<br/>
<br/>
<br/>
### Contributers
- Nishith(https://github.com/NISHITZA/)
- Sushant (https://github.com/sushant871998/)


