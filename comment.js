//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/commentsDB', { useNewUrlParser: true, useUnifiedTopology: true });

//create comment schema
const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    comment: String,
    date: { type: Date, default: Date.now }
});

//create comment model
const Comment = mongoose.model('Comment', commentSchema);

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.post('/comments', async (req, res) => {
    const { name, email, comment } = req.body;
    const newComment = new Comment({ name, email, comment });
    try {
        await newComment.save();
        res.status(201).send('Comment added successfully');
    } catch (error) {
        res.status(500).send('Error adding comment');
    }
});

app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).send('Error fetching comments');
    }
});

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});