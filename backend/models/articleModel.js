const mongoose = require('mongoose');

const articleSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    body:{
        type:String,
        required: true
    },
    userId:{
        type:String,
        required: true,
        default:001
    },
    createdAt  :{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('article',articleSchema);