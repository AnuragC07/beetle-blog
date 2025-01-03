const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        author: String,
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        image: String,
        content: {
            type: String,
            required: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog; 