const express = require('express');
const User = require('../models/userSchema');
const router = express.Router();
// const User = require('.'); // Import the User model

// Registration route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Create a new user instance
        const newUser = new User({ name, email,password });

        // Save the user to the database
        await newUser.save();

        // Send success response
        res.json({
            User: newUser,
            message: 'Registration successful'
        });
    } catch (error) {
        // Handle any errors (e.g., duplicate email)
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

module.exports = router;
