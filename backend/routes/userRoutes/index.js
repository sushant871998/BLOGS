const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    const articles=[{
        title:"My first Article",
        description:"This is a test Article",
        body:"Test article-1",
        createdAt:new Date()
    }]  
    res.render('index',{text:articles})
});
module.exports = router;

