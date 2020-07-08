const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User=require('./../../models/userModel');

router.get('/',(req,res)=>{
    res.render('./../../frontend/register.ejs');
});

router.get('/fail',(req, res)=>{
    res.render('./../../frontend/fail/registerFail.ejs')
});

router.post('/',(req,res)=>{
    const{ name ,email, password}=req.body;
    User.findOne({email : email})
        .then(user=>{
            if(user){
                //User exists
                res.redirect('/register/fail')
            } else {
                const newUser = new User({
                    userId:Date.now().toString(),
                    name:name,
                    email:email,
                    password:password
                });
                
                //Hash Password
                bcrypt.genSalt(10,(err,salt) => 
                 bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;

                    //Set password to hashed
                    newUser.password=hash;

                    //Save user
                    newUser.save()
                        .then(user=>{
                            //req.flash('Success_msg' ,'You are now registered and can log in');
                            res.redirect('/login');
                        })
                        .catch(err=>{
                            console.log('Error while saving '+err);
                        })
                }))

            }
        })
});
module.exports = router;