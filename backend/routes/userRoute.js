const User = require("../models/userModel");
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { jwtAuthMiddleware, generateToken, extractUsernameFromToken } = require('../jwt');
const Blog = require("../models/blogModel");
const app = express();
const Topic = require("../models/topicModel");
const Column = require("../models/columnModel");

app.use(express.json());

// async function handleUserSignUp(req, res) {
//     const { username, email, password } = req.body;
//     await User.create({
//         username,
//         email,
//         password
//     });
//     console.log(User);
//     res.redirect("/");
// }


//api for user registration with jwt token generation
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 12);
        const user = await User.create({ username, email, password: hash });

        const payload = {
            id: user.id,
            username: user.username
        };

        const token = generateToken(payload);

        res.status(200).json({ user: { id: user.id, username: user.username, email: user.email, password: user.password }, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//new api for user login with jwt token creation
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: "Invalid email", message: "Wrong Credentials" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Password is not correct" });
        }
        const payload = {
            id: user.id,
            username: user.username
        };
        const token = generateToken(payload);
        res.status(200).json({ token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/api/bookmarks', jwtAuthMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('bookmarkedBlogs');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ bookmarkedBlogs: user.bookmarkedBlogs || [] });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: error.message });
    }
});



router.post('/bookmark', jwtAuthMiddleware, extractUsernameFromToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id: blogId } = req.body;

        console.log("Blog ID to bookmark:", blogId);
        if (!mongoose.isValidObjectId(blogId)) {
            return res.status(400).json({ message: "Invalid blog ID format" });
        }

        const user = await User.findById(userId);
        if (!user.bookmarkedBlogs.includes(blogId)) {
            user.bookmarkedBlogs.push(blogId);
            await user.save();
        }

        res.status(200).json({ message: "Blog bookmarked successfully!" });
    } catch (error) {
        console.error("Error bookmarking blog:", error);
        res.status(500).json({ message: "An error occurred", error });
    }
});

router.delete("bookmark/:blogId", jwtAuthMiddleware, extractUsernameFromToken, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming JWT middleware provides user ID
        const { blogId } = req.params;

        // Remove blogId from the user's bookmarkedBlogs array
        const user = await User.findById(userId);
        user.bookmarkedBlogs = user.bookmarkedBlogs.filter(
            (id) => id.toString() !== blogId
        );
        await user.save();

        res.status(200).json({ message: "Blog removed from bookmarks!" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Follow a topic
router.post('/follow-topic', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        let { topicName } = req.body;
        if (!topicName) return res.status(400).json({ message: "Topic name required" });
        topicName = topicName.trim().toLowerCase();

        // Add topic to user's followedTopics if not already present
        const user = await User.findById(userId);
        if (!user.followedTopics.map(t => t.toLowerCase()).includes(topicName)) {
            user.followedTopics.push(topicName);
            await user.save();
        }

        // Increment topic follower count (create topic if not exists)
        let topic = await Topic.findOne({ name: topicName });
        if (!topic) {
            topic = await Topic.create({ name: topicName, followers: 1 });
        } else {
            topic.followers += 1;
            await topic.save();
        }

        res.status(200).json({ message: `Followed ${topicName}`, topic });
    } catch (error) {
        console.error("Follow-topic error:", error);
        res.status(500).json({ message: error.message });
    }
});

// Unfollow a topic
router.post('/unfollow-topic', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        let { topicName } = req.body;
        if (!topicName) return res.status(400).json({ message: "Topic name required" });
        topicName = topicName.trim().toLowerCase();

        // Remove topic from user's followedTopics
        const user = await User.findById(userId);
        user.followedTopics = user.followedTopics.filter(t => t.toLowerCase() !== topicName);
        await user.save();

        // Decrement topic follower count
        const topic = await Topic.findOne({ name: topicName });
        if (topic && topic.followers > 0) {
            topic.followers -= 1;
            await topic.save();
        }

        res.status(200).json({ message: `Unfollowed ${topicName}`, topic });
    } catch (error) {
        console.error("Unfollow-topic error:", error);
        res.status(500).json({ message: error.message });
    }
});

// Get all topics with follower counts
router.get('/topics', async (req, res) => {
    try {
        const topics = await Topic.find({});
        res.status(200).json({ topics });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user's followed topics
router.get('/user/followed-topics', jwtAuthMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ followedTopics: user.followedTopics || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin endpoint to clean up duplicate topics (run once if you get duplicate key errors)
router.post('/admin/cleanup-topics', async (req, res) => {
    try {
        await Topic.cleanupDuplicates();
        res.status(200).json({ message: 'Duplicate topics cleaned up.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new column
router.post("/columns", jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, description } = req.body;
        const column = new Column({ name, description, user: userId });
        await column.save();
        res.status(201).json({ message: "Column created", column });
    } catch (err) {
        res.status(500).json({ error: "Failed to create column" });
    }
});

// Get columns for logged-in user
router.get("/columns/user", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "No token" });
        const jwt = require("../jwt");
        const decoded = jwt.verifyToken(token);
        const userId = decoded.id;
        const columns = await Column.find({ user: userId });
        const user = await require("../models/userModel").findById(userId);
        res.json({ columns, user: { username: user.username } });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch columns" });
    }
});

// Public route to get all columns for a user by userId
router.get("/columns/by-user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const columns = await require("../models/columnModel").find({ user: userId });
        res.json({ columns });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch columns" });
    }
});

// Public route to get a single column by its ID
router.get("/column/:columnId", async (req, res) => {
    try {
        const columnId = req.params.columnId;
        const column = await require("../models/columnModel").findById(columnId);
        if (!column) return res.status(404).json({ error: "Column not found" });
        const user = await require("../models/userModel").findById(column.user);
        res.json({ column, user: { username: user.username } });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch column" });
    }
});


//api for user profile
// router.get('/user', jwtAuthMiddleware, async (req, res) => {
//     try {
//         const userData = req.user;
//         console.log("User data: ", userData);
//         const userId = userData.id;
//         if (!mongoose.isValidObjectId(userId)) {
//             return res.status(400).json({ error: 'Invalid user ID' });
//         }
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         res.status(200).json({ user });
//     }
//     catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// old api for user login
// router.post('/signin', (req, res) => {
//     const { email, password } = req.body;
//     User.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 bcrypt.compare(password, user.password, (err, response) => {
//                     if (response) {
//                         const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
//                         res.status(200).json({ token: token });
//                         console.log(token);
//                     } else {
//                         res.status(401).json({ error: "Password is not correct" });
//                     }
//                 });
//             } else {
//                 res.status(404).json({ error: "User not found" });
//             }
//         })
//         .catch(err => res.status(500).json({ error: err.message }));
// });




module.exports = router;