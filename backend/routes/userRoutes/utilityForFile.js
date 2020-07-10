
//The function in this module helps to get the article from the given slug

const mongoose = require('mongoose');
const GridFsStorage = require("multer-gridfs-storage");

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

module.exports=function findFile(req,res,article)
{
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
             files: false,
             id:req.user.id
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
                id:req.user.id
            });
        }
    });
}