const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('./../../frontend/login.ejs');
});

module.exports = router;