const express = require('express');
const router = express.Router();
const Article=require('./../../models/articleModel');

let userId=0;

router.get('/new',(req,res)=>{
    res.render('./../../frontend/newArticle.ejs');
    //userId=req.user.id;
});

router.get('/:id', async (req,res)=>{
    const article =await Article.findById(req.params.id);
    if(article == null) res.redirect('/homepage');
    res.render('./../../frontend/showArticle.ejs',{ article: article });
});

router.post('/new', async (req,res)=>{
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        userId: userId
    });
    try{
        let art=await article.save();
        res.redirect(`/article/${art.id}`)
    }
    catch (e)
    {
        console.log("Error while saving "+e);
        res.render('./../../frontend/newArticle.ejs');
    }
    
});
module.exports = router;