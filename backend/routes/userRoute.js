const User = require("../models/userModel");
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

const app = express();

app.use(express.json());

// async function handleUserSignUp(req, res) {
//     const { username, email, password } = req.body;
//     await User.create({
//         username,
//         email,
//         password
//     });
//     console.log(User);
//     res.redirect("/home");
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
            return res.status(404).json({ error: "Invalid email" });
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