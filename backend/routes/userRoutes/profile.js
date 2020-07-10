const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('./../../config/auth');
const Article=require('./../../models/articleModel');
const mongoose = require('mongoose');
const GridFsStorage = require("multer-gridfs-storage");
const findFile=require("./utilityForFile")
const imageUtility=require("./getImageUtility");
const Comment=require('./../../models/commentsModel');
require('dotenv').config();

const mongoURI=process.env.URI;
const conn = mongoose.connection
let gfs;
conn.once("open", () => {
    // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads"
    });
});


router.get('/myArticles',ensureAuthenticated,   async(req,res)=>{
    const articles=await Article.find({userId:req.user.id}).sort({ createdAt :'desc'});
    res.render('./../../frontend/profile/myArticles.ejs',{
    articles:articles,
    name:req.user.name,
    id:req.user.id
    });
});



router.put('/myArticles/edit/:slug', async (req, res, next) => {
    req.article = await Article.findOne({slug:req.params.slug})
    next()
  }, saveArticleAndRedirect('edit'))



  router.get('/myArticles/:slug', ensureAuthenticated,async(req,res)=>{
    const article =await Article.findOne({slug:req.params.slug});
    if(article == null) res.redirect('/myArticles');
    findFile(req,res,article);
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
        res.redirect(`./../../frontend/showArticle.ejs`,{ article: article,id:req.user.id })
      } catch (e) {
        res.render(`./../../frontend/showArticle.ejs`,{ article: article,id:req.user.id })
      }
    }
  }

router.get('/myArticles/image/:filename', (req, res) => {
    // console.log('id', req.params.id)
   imageUtility(req,res);
})

router.get('/myComments/:id', ensureAuthenticated, async(req,res)=>{
  const comment=await Comment.find({userId:req.params.id}).sort({ createdAt :'desc'})
  if(comment==null)  res.redirect('/homepage');
  res.render('./../../frontend/profile/myComments.ejs',{
      comments:comment,
      id:req.user.id
  });
});
module.exports = router;