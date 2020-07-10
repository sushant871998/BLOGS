const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    body: { type: String, required: true, trim: true },
    articleId:{type: Schema.Types.ObjectId, ref: 'article'},
    username:{type: String, required: true, trim: true},
    createdAt:{type:Date,default:Date.now}    
},{
    timestamps : true,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;