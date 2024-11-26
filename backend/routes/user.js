const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/add-user", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json({ message: "User added successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Failed to add user", error });
    }
});

module.exports = router;
