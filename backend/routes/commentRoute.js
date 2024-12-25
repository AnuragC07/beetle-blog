const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');
const Blog = require('../models/blogModel');
const { jwtAuthMiddleware, generateToken, extractUsernameFromToken } = require('../jwt');


router.get('/comments/:id', jwtAuthMiddleware, extractUsernameFromToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Find comments associated with the given blogId
        const comments = await Comment.find({ blog: id }).populate('author', 'username');

        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comments', details: error.message });
    }
});



// Create a comment
router.post('/comments', jwtAuthMiddleware, extractUsernameFromToken, async (req, res) => {
    try {
        const { blogId, authorId, content } = req.body;

        if (!blogId || !authorId || !content) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create the comment
        const comment = new Comment({ blog: blogId, author: authorId, content });
        await comment.save();

        // Update the blog to include the new comment
        await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });

        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
        res.status(500).json({ error: 'Error adding comment', details: error.message });
    }
});

module.exports = router;
