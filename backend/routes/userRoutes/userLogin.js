const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/',(req,res)=>{
    res.render('./../../frontend/login.ejs');
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

router.get('/fail',(req, res)=>{
    res.render('./../../frontend/fail/loginFail.ejs')
});

router.post('/',(req ,res, next)=>{
    passport.authenticate('local-1',{
        successRedirect: '/homepage',
        failureRedirect: '/login/fail',
        //failureFlash: true
    })(req, res, next);
});

module.exports = router;