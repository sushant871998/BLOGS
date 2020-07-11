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
- Go to `https://localhost:5000` to access the app
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
### Models
Different models have been used to save the data in the database
- adminModel
- articleModel
- commentsModel
- userModel
### Contributers
- Nishith
- Sushant 

