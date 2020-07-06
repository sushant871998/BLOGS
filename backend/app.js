const express= require('express');
const app=express();
const PORT = process.env.PORT || 5000;


//Middleware
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: false }));
//Routes
app.use('/',require('./routes/userRoutes/index'));
app.use('/login',require('./routes/userRoutes/userLogin'));
app.use('/register',require('./routes/userRoutes/userRegister'));


app.listen(PORT,console.log(`Server started on port ${PORT}`));