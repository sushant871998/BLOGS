const express = require('express');
const router = express.Router();
const Article=require('./../../models/articleModel');
let userId=0;

router.get('/myArticles', (req,res)=>{
    res.send('hello');
    userId=req.user.id;
});

router.get('/myComments', (req,res)=>{
    res.send('hello');
    userId=req.user.id;
});

module.exports = router;