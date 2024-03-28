const Blog = require("../models/blogModel");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { jwtAuthMiddleware, generateToken } = require('../jwt');
//multer storage
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`);
    },
});

const upload = multer({
    storage: Storage
})

//middleware for jwt
// function verifyToken(req, res, next) {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(401).json({ error: 'Access denied. Token is required.' });

//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//         if (err) return res.status(403).json({ error: 'Invalid token.' });
//         req.user = decoded.user;
//         next();
//     });
// }

//middleware for jwt 2
// const jwtAuthMiddleware = (req, res, next) => {
//     const token = req.headers.authorization.split(' ')[1];
//     if (!token)
//         return res.status(401).json({ error: 'Unauthorized' });
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         req.user = decoded
//         next();
//     }
//     catch (err) {
//         console.error(err);
//         res.status(401).json({ error: 'Invalid token' });
//     }
// }



//api to create a new Blog
router.post('/', jwtAuthMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({
                message: "Please enter all fields",
            });
        }
        const newBlog = {
            title: req.body.title,
            image: req.file.filename,
            content: req.body.content,
        };
        const blog = await Blog.create(newBlog);
        return res.status(200).json(blog);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//api to show all blogs
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json({
            data: blogs,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//api to show a specific blog
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//api to delete a specific blog
router.delete("/:id", jwtAuthMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;