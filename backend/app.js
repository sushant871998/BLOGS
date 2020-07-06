const express= require('express');
const app=express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

//Database connection
require('dotenv').config();
const databaseUri=process.env.URI;
mongoose.connect(databaseUri,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
        .then(res=>{
            console.log('Database has been connected');
        })
        .catch(err=>{
            console.log('Database connection error '+err);
        });

//Middleware
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: false }));
//Routes
app.use('/',require('./routes/userRoutes/index'));
app.use('/login',require('./routes/userRoutes/userLogin'));
app.use('/register',require('./routes/userRoutes/userRegister'));
app.use('/homepage',require('./routes/userRoutes/homepage'))
app.use('/article',require('./routes/userRoutes/article'))
app.listen(PORT,console.log(`Server started on port ${PORT}`));