require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db'); // Database connection function

const app = express();

// Call the connectDB function to initiate the connection
connectDB()
    .then(() => console.log('MongoDB connected successfully.'))
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit the process if the database connection fails
    });

// Middleware to parse JSON requests
app.use(express.json());

// Add routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/bookings', require('./routes/booking')); // Booking routes
app.use('/api/bookpayment', require('./routes/bookPayment')); // Payment routes
// app.use('/api/reg', require('./routes/verifyotp')); // OTP verification routes

// Basic route example
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
