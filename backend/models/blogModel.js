const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: String,
        image: String,
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog; 