const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './server/.env' });

const app = express();
app.use(cors());
app.use(express.json());

const Post = require('./models/post');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    comments: []
  });
  await post.save();
  res.json(post);
});

app.post('/posts/:id/comments', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ body: req.body.body, date: new Date() });
  await post.save();
  res.json(post);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));