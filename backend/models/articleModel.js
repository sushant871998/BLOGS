const mongoose = require('mongoose');
const marked =require('marked');
const slugify=require('slugify');

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
    },
    slug:{
        type:String,
        required: true,
        unique: true
    },
    imageId:{
        type: String
    }
});

articleSchema.pre('validate',function(next){
    if(this.title){
        this.slug=slugify(this.title,{lower:true,strict:true})
    }
    next();
})

module.exports=mongoose.model('article',articleSchema);