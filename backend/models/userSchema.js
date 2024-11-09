const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,  // Minimum length for the name
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure unique email addresses
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Basic email validation regex
    },
    password: {
        type: String,
        required: true,
        minlength: 6,  // Minimum length for the password
    }
}, {
    timestamps: true,  // Automatically add createdAt sand updatedAt fields
});

// Create and export the model
const User = mongoose.model('User', userSchema);

module.exports = User;
