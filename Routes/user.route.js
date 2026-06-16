const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



router.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Email and password and Name are required" });
        }

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User Already Exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            name
        })

        await newUser.save();

        let token = jwt.sign(
            {
                email,
                id: newUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1w"
            }

        );

        res.status(201).json({
            message: "Client Registred",
            user: newUser,
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password empty" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(201).json({ message: "Email don't exist" })
        }

        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(
                {
                    email,
                    id: user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1w"
                }
            );
            return res.status(201).json({ message: "register succes", user, token })
        } else {
            return res.status(400).json({ message: "passwrod or email donn't match" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

})

router.get("/:id", async (req, res) => {
    // const user = await User.findOne({"_id": req.params.id});
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "user dont exist" })
    }
    return res.status(200).json({ user })


})

module.exports = router;