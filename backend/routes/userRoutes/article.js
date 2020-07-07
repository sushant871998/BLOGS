const express = require('express');
const router = express.Router();
const Article=require('./../../models/articleModel');
const { ensureAuthenticated } = require('./../../config/auth');
let userId=0;

router.get('/new',ensureAuthenticated, (req,res)=>{
    res.render('./../../frontend/newArticle.ejs');
    userId=req.user.id;
});

router.get('/:slug', ensureAuthenticated, async (req,res)=>{
    const article =await Article.findOne({slug:req.params.slug});
    if(article == null) res.redirect('/homepage');
    res.render('./../../frontend/showArticle.ejs',{ article: article });
});

router.post('/new', ensureAuthenticated, async (req,res)=>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,

    });
    try{
        let art=await article.save();
        res.redirect(`/article/${art.slug}`)
    }
    catch (e)
    {
        console.log("Error while saving "+e);
        res.render('./../../frontend/newArticle.ejs');
    }
    
});

//adding article route
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
  })
module.exports = router;