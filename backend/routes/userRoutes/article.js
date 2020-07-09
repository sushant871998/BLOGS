const express = require('express');
const router = express.Router();
const Article=require('./../../models/articleModel');
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const mongoose = require('mongoose');
const GridFsStorage = require("multer-gridfs-storage");
const { ensureAuthenticated } = require('./../../config/auth');
let userId=0;

router.get('/new',ensureAuthenticated, (req,res)=>{
    res.render('./../../frontend/newArticle.ejs');
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
    const filename=article.imageId;
    console.log(filename);
    if(article == null) res.redirect('/homepage');
    res.render('./../../frontend/showArticle.ejs',{ article: article });
});

router.post('/new', upload.single("file"), async (req,res)=>{
    console.log(req.file.filename);
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
        res.render('./../../frontend/newArticle.ejs');
    }
    
});

//adding article route
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
  })
module.exports = router;