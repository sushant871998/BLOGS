const mongoose= require('mongoose');

const commentSchema = new mongoose.Schema({
    commentId:{
        type:Number,
        required: true,
        unique:true,
    },

    commentBody:{
        type:Number,
        required:true,
    },
    articleId:[
            {type:mongoose.Schema.Types.ObjectId, ref: 'article'}
        ],
    userId:[
        {type:mongoose.Schema.Types.ObjectId, ref:'user'}
    ]
});

module.exports=mongoose.model('Comments',commentSchema);