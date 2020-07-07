const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/',(req,res)=>{
    res.render('./../../frontend/login.ejs');
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login');
});

router.post('/',(req ,res, next)=>{
    passport.authenticate('local',{
        successRedirect: '/homepage',
        failureRedirect: '/login',
        //failureFlash: true
    })(req, res, next);
});

module.exports = router;