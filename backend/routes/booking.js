const express = require('express');
const BookingNow = require('../models/bookingShema');
const router = express.Router();

router.post('/book', async (req, res) => {
  const { name, email,contact,date, time, passengers } = req.body;
  const route = 'Mysore to Bangalore';
  const price = 2000;

  if (!name || !date || !time || !passengers) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newBooking = new BookingNow ({
      name,
      email,
      contact,
      date,
      time,
      passengers,
      route,
      price,
    });
    await newBooking.save();
    res.status(201).json({
      message: 'Booking confirmed successfully',
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
});

module.exports = router;



