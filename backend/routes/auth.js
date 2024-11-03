// routes/auth.js
const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    const { name, email } = req.body;
    // Simulated registration logic
    const user = { name, email }; // Example user object

    // Send response in expected format
    res.json({
        user,
        message: 'Registration successful'
    });
});

module.exports = router;

