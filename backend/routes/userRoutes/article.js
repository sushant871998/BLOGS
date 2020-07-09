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
    if(article == null) res.redirect('/homepage');
    //Gfs for image 
    if(!gfs) {
        console.log("some error occured, check connection to db");
        res.send("some error occured, check connection to db");
        process.exit(0);
      }
      gfs.find({ filename: article.imageId }).toArray((err, files) => {
        // check if files
        if (!files || files.length === 0) {
         return res.render('./../../frontend/showArticle.ejs',{ 
             article: article ,
             files: false
            });
        } else {
          const f = files
            .map(file => {
              if (
                file.contentType === "image/png" ||
                file.contentType === "image/jpeg"
              ) {
                file.isImage = true;
              } else {
                file.isImage = false;
              }
              return file;
            })
            return res.render('./../../frontend/showArticle.ejs',{ 
                files: f,
                article: article ,
                
            });
        }
      });
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
        res.render('./../../frontend/newArticle.ejs');
    }
    
});

//adding article route
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
  });

router.get("/image/:filename", (req, res) => {
    // console.log('id', req.params.id)
    const file = gfs
      .find({
        filename: req.params.filename
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      });
});

module.exports = router;