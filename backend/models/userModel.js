const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        bookmarkedBlogs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Blog', // This assumes you have a Blog model
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
