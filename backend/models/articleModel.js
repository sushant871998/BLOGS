const mongoose = require('mongoose');

const articleSchema= new mongoose.Schema({
    articleId:{
        type:Number,
        required:true,
        unique:true,
    },
    articleTitle:{
        type:String,
        required:true
    },
    articleBody:{
        type:String,
        required: true
    },
    userId:{
        type:Number,
        required: true
    },

    createdAt  :{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('article',articleSchema);