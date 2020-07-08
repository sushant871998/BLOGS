const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('./../../config/auth');
const Article=require('./../../models/articleModel');


router.get('/myArticles',ensureAuthenticated,   async(req,res)=>{
    const articles=await Article.find({userId:req.user.id}).sort({ createdAt :'desc'});
    res.render('./../../frontend/profile/myArticles.ejs',{
    articles:articles,
    name:req.user.name,
    });
});

router.put('/myArticles/edit/:slug', async (req, res, next) => {
    req.article = await Article.findOne({slug:req.params.slug})
    next()
  }, saveArticleAndRedirect('edit'))
router.get('/myArticles/:slug', ensureAuthenticated,async(req,res)=>{
    const article =await Article.findOne({slug:req.params.slug});
    if(article == null) res.redirect('/myArticles');
    res.render('./../../frontend/showArticle.ejs',{ article: article });
});

router.delete('/myArticles/:slug',ensureAuthenticated,async(req,res)=>{
    const article =await Article.findOne({slug:req.params.slug});
    if(article==null) res.redirect('/profile/myArticles')
    await Article.findByIdAndDelete(article.id)
    res.redirect('/profile/myArticles')
})
router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
  }, saveArticleAndRedirect('new'))
function saveArticleAndRedirect(path) {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.body = req.body.body
      try {
        article = await article.save()
        res.redirect(`./../../frontend/showArticle.ejs`,{ article: article })
      } catch (e) {
        res.render(`./../../frontend/showArticle.ejs`,{ article: article })
      }
    }
  }

router.get('/myComments', ensureAuthenticated, (req,res)=>{
    res.render('./../../frontend/profile/myComments.ejs');
});
module.exports = router;