const express = require('express');
const router = express.Router();
const Article= require('./../../models/articleModel');

router.get('/', async(req,res)=>{
    // let articles=[{
    //     id:00,
    //     title:'nis',
    //     description:'11',
    //     body:'23',
    // }]
    const articles=await Article.find().sort({ createdAt :'desc'});
    res.render('./../../frontend/homepage.ejs',{
        articles:articles,
    });
});
module.exports = router;