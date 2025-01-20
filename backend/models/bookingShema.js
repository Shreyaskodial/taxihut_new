const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },  // Added trim to clean up whitespace
  date: { type: Date, required: true },
  time: { type: String, required: true, trim: true },
  passengers: { type: Number, required: true, min: 1 },
  route: { type: String, required: true, default: 'Mysore to Bangalore' },
  price: { type: Number, required: true, default: 2000 },
}, {
  timestamps: true,  // Adds createdAt and updatedAt fields
});

// Using const for the model name for clarity and consistency
const BookingNow = mongoose.model('BookingNow', bookingSchema);

module.exports = BookingNow;
