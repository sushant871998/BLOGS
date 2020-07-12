const express = require('express');
const router = express.Router();
const User = require('./../../models/userModel');
const Admin = require('./../../models/adminModel');
const { ensureAuthenticatedAdmin } = require('./../../config/authAdmin');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/',(req,res)=>{
    res.render('./../../frontend/admin/adminLogin.ejs');
});

router.get('/fail',(req,res)=>{
    res.render('./../../frontend/fail/adminLoginFail.ejs')
});

router.get('/registerFail',(req,res)=>{
    res.render('./../../frontend/fail/adminRegisterFail.ejs')
})

router.post('/',(req,res,next)=>{
    passport.authenticate('local-2',{
        successRedirect: '/admin/home',
        failureRedirect: '/admin/fail',
        //failureFlash: true
    })(req, res, next);
});

router.get('/home',ensureAuthenticatedAdmin, async(req,res)=>{

    const users= await User.find();
    res.render('./../../frontend/admin/adminHome.ejs',{
        users:users,
    });
});

router.get('/new',ensureAuthenticatedAdmin, async(req, res)=>{
    res.render('./../../frontend/admin/adminNew.ejs');
});

router.get('/success',(req,res)=>{
    res.render('./../../frontend/admin/adminSuccess.ejs');
});

router.post('/new',async(req,res)=>{
    const{ name ,email, password} = req.body;
    Admin.findOne({ email: email})
    .then(admin=>{
        if(admin){
            //Admin exists
            res.redirect('/admin/registerFail');
        } else {
            const newAdmin = new Admin({
                adminId:Date.now().toString(),
                name:name,
                email:email,
                password:password
            });
            
            //Hash Password
            bcrypt.genSalt(10,(err,salt) => 
             bcrypt.hash(newAdmin.password,salt,(err,hash)=>{
                if(err) throw err;

                //Set password to hashed
                newAdmin.password=hash;

                //Save user
                newAdmin.save()
                    .then(user=>{
                        //req.flash('Success_msg' ,'You are now registered and can log in');
                        res.redirect('/admin/success');
                    })
                    .catch(err=>{
                        res.redirect('/admin/registerFail')
                        console.log('Error while saving '+err);
                    })
            }))
        }
    })
})

module.exports = router;