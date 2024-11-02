// Import Mongoose
const mongoose = require('mongoose');

// Read MongoDB URI from environment variable
const database = process.env.database;

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
