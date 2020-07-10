const express= require('express');
const app=express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

//method-override for delete
const methodoverride=require('method-override') 

//Passport config
require('./config/passport')(passport);
//Database connection
require('dotenv').config();
const databaseUri=process.env.URI;
mongoose.connect(databaseUri,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true})
        .then(res=>{
            console.log('Database has been connected');
        })
        .catch(err=>{
            console.log('Database connection error '+err);
        });

//Middleware
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }));
app.use(passport.initialize());
app.use(passport.session());
//for specifying that method-override has to work on a method
app.use(methodoverride('_method'))

//Routes
app.use('/',require('./routes/userRoutes/firstPage'));
app.use('/login',require('./routes/userRoutes/userLogin'));
app.use('/register',require('./routes/userRoutes/userRegister'));
app.use('/homepage',require('./routes/userRoutes/homepage'))
app.use('/article',require('./routes/userRoutes/article'))
app.use('/profile',require('./routes/userRoutes/profile'))
app.use('/admin',require('./routes/adminRoutes/adminIndex'));
app.use('/delete',require('./routes/adminRoutes/adminDelete'));
app.use('/auth',require('./routes/userRoutes/google'));


app.listen(PORT,console.log(`Server started on port ${PORT}`));

module.exports = app;