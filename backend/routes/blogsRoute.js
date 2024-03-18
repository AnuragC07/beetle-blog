const Blog = require("../models/blogModel");
const express = require("express");
const router = express.Router();
const multer = require("multer");


//multer storage
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`);
    },
});

const upload = multer({
    storage: Storage
})

//api to create a new Blog
router.post('/', upload.single('file'), async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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