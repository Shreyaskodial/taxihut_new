const mongoose = require('mongoose');

// Define the schema for OTP verification
const otpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false, // Set to true once the user verifies OTP
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the model
const OtpVerification = mongoose.model('OtpVerification', otpSchema);

module.exports = OtpVerification;
