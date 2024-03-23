const User = require("../models/userModel");
const express = require("express");
const router = express.Router();


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


//api for user registration
router.post('/signup', (req, res) => {
    User.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

//api for user login
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                }
                else {
                    res.json("Password is not correct")
                }
            }
            else {
                res.json("no record exists");
            }
        })
})




module.exports = router;