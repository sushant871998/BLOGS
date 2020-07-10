const router= require('express').Router();
const passport = require('passport');
const { ensureAuthenticated } = require('./../../config/auth');


router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}),(req,res)=>{

});

router.get('/google/fail',(req,res)=>{
    res.render('./../../frontend/fail/googleFail.ejs')
});

router.get('/google/success',(req,res)=>{
    console.log(req.user)
    res.render('./../../frontend/fail/googleSuccess.ejs')
});

router.get('/google/redirect',passport.authenticate('google',
{
    
    failureRedirect:'/auth/google/fail',
    successRedirect:'/homepage'
}),(req,res)=>{
    res.redirect('/')
});


module.exports = router;