const User = require("../models/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

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
    const { username, email, password } = req.body;
    bcrypt.hash(password, 12)
        .then(hash => {
            User.create({ username, email, password: hash })
                .then(users => res.json(users))
                .catch(err => res.json(err))
        })
        .catch(err => console.log(err.message))

})

//api for user login
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        res.json("Success")
                    }
                    else {
                        res.json("Password is not correct")
                        console.log(res);
                    }
                })
            }
            else {
                res.json("no record exists");
            }
        })
})




module.exports = router;