const express = require('express');
const router = express.Router();
const User = require('./../../models/userModel');


router.get('/',(req,res)=>{
    res.render('./../../frontend/admin/adminLogin.ejs');
});

router.get('/home', async(req,res)=>{

    const users= await User.find();
    res.render('./../../frontend/admin/adminHome.ejs',{
        users:users,
    });
});

module.exports = router;