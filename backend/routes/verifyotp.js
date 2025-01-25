// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');
// const OtpVerification = require('../models/OtpVerification');
// require('dotenv').config();

// // Configure the email transporter
// // const transporter = nodemailer.createTransport({
// //     host: process.env.SMTP_HOST, // E.g., 'smtp.gmail.com'
// //     port: process.env.SMTP_PORT, // Usually 587 for TLS
// //     secure: false, // Use `true` for port 465
// //     auth: {
// //         user: process.env.SMTP_USER,
// //         pass: process.env.SMTP_PASS,
// //     },
// // });
// const transporter = nodemailer.createTransport({
//     host: 'smtp-relay.brevo.com', // Brevo SMTP server
//     port: 587, // Brevo SMTP port
//     secure: false, // Use TLS (false for port 587)
//     auth: {
//         user: '8447cd002@smtp-brevo.com', // Your Brevo login
//         pass: 'cBVqFH3ZYyU1DjJw', // Your Brevo password or SMTP key
//     },
// });


// router.post('/verify', async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         console.log('entey');
//         const hashedPassword = await bcrypt.hash(password, 10); // Hash password for security
//         const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

//         // Save user and OTP details to the database
//         await OtpVerification.create({
//             name,
//             email,
//             hashedPassword,
//             otp,
//             expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
//         });

//         const mailOptions = {
//             from: process.env.SMTP_USER,
//             to: email,
//             subject: 'Your OTP for Registration',
//             text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
//             html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for <strong>10 minutes</strong>.</p>`,
//         };
//         // console.log(mailOptions);
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ message: 'OTP sent successfully' });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Failed to send OTP or save user data' });
//     }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const OtpVerification = require('../models/OtpVerification');
require('dotenv').config();

// Configure the email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', // Brevo SMTP server
    port: 587, // Brevo SMTP port
    secure: false, // Use TLS (false for port 587)
    auth: {
        user: '8447cd002@smtp-brevo.com', // Your Brevo login
        pass: 'cBVqFH3ZYyU1DjJw', // Your Brevo password or SMTP key
    },
});

router.post('/verify', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if a recent OTP exists for this email
        const existingOtp = await OtpVerification.findOne({ email });
        if (existingOtp) {
            const timeSinceLastOtp = Date.now() - new Date(existingOtp.createdAt).getTime();
            if (timeSinceLastOtp < 60 * 1000) { // 1 minute
                return res.status(429).json({ message: 'Please wait 1 minute before requesting a new OTP' });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a new OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

        // Delete any previous OTPs for this email
        await OtpVerification.deleteMany({ email });

        // Save the new OTP to the database
        await OtpVerification.create({
            name,
            email,
            hashedPassword,
            otp,
            expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
        });

        // Send the OTP via email
        const mailOptions = {
            from: '8447cd002@smtp-brevo.com', // Replace with Brevo email
            to: email,
            subject: 'Your OTP for Registration',
            text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
            html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for <strong>10 minutes</strong>.</p>`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to send OTP or save user data' });
    }
});

// Periodic cleanup of expired OTPs (optional but recommended)
setInterval(async () => {
    try {
        await OtpVerification.deleteMany({ expiresAt: { $lt: Date.now() } });
        console.log('Expired OTPs cleaned up');
    } catch (error) {
        console.error('Error cleaning up expired OTPs:', error);
    }
}, 60 * 1000); // Runs every minute

module.exports = router;

