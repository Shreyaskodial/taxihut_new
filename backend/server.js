// index.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Call the connectDB function to initiate the connection
connectDB();
console.log('MongoDB URI:', process.env.MONGO_URI);


// Middleware to parse JSON requests
app.use(express.json());

// Basic route example
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
