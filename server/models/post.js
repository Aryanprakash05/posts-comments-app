const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  body: String,
  date: Date
});

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: [CommentSchema]
});

module.exports = mongoose.model('Post', PostSchema);
