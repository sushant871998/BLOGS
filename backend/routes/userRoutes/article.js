const express = require('express');
const router = express.Router();
const Article=require('./../../models/articleModel');
const Comment=require('./../../models/commentsModel');
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const mongoose = require('mongoose');
const GridFsStorage = require("multer-gridfs-storage");
const { ensureAuthenticated } = require('./../../config/auth');
//utilitymade for getting the article
const findFile=require("./utilityForFile")
//utility made for image download
const imageUtility=require("./getImageUtility");
let userId=0;

router.get('/new',ensureAuthenticated, (req,res)=>{
    res.render('./../../frontend/newArticle.ejs',{id:req.user.id});
    userId=req.user.id;
});
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

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
      });
    }
});

const upload = multer({
    storage
});


router.get('/:slug', ensureAuthenticated, async (req,res)=>{
    const article =await Article.findOne({slug:req.params.slug});
    if(article == null) res.redirect('/homepage');
    //Gfs for image 
    findFile(req,res,article);
});

router.get('/comments/:id',ensureAuthenticated, async (req,res)=>{
    const article =await Article.findById(req.params.id);
    if(article == null) res.redirect('/homepage');
    const comment=await Comment.find({articleId:req.params.id}).sort({ createdAt :'desc'})
    if(comment==null)  res.render('./../../frontend/comments.ejs',{
        comments:false,
        id:req.user.id
    });
    res.render('./../../frontend/comments.ejs',{
        comments:comment,
        id:req.user.id
    });
})




router.post('/comments/:id', ensureAuthenticated, async (req,res)=>{
    
    //Gfs for image
    const article =await Article.findById(req.params.id);
    if(article == null) res.redirect('/homepage');
    let comment = new Comment({
        articleId: article._id,
        body: req.body.body,
        userId:req.user.id,
        username:req.user.name,
    });

    try{
        let cmt=await comment.save();
        res.redirect('/article/comments/'+req.params.id);
    }
    catch (e)
    {
        console.log("Error while saving "+e);
        res.redirect('/homepage');
    }


});


router.post('/new', upload.single("file"), async (req,res)=>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        userId:req.user.id,
        imageId:req.file.filename
    });
    try{
        let art=await article.save();
        res.redirect(`/article/${art.slug}`)
    }
    catch (e)
    {
        console.log("Error while saving "+e);
        res.render('./../../frontend/newArticle.ejs',{id:req.user.id});
    }
    
});

//adding article route
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
  });

router.get("/image/:filename", (req, res) => {
    // console.log('id', req.params.id)
   imageUtility(req,res);
})


module.exports = router;