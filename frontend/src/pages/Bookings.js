import React, { useState } from 'react';
import './Booking.css';
import axios from 'axios';

const Bookings = () => {
  const [formData, setFormData] = useState({ name: '', date: '', time: '', passengers: 1 });
  const [message, setMessage] = useState('');
  const tripPrice = 1500; // Define the trip price or fetch from server if dynamic

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const initiatePayment = async (orderId, amount) => {
    const options = {
      key: 'rzp_test_K0RlwZlz7o5u1K', // Use your Razorpay key
      amount: 1, // Convert to paise
      currency: 'INR',
      name: 'Sk Travel',
      description: 'Trip Booking',
      order_id: orderId, // Use dynamic orderId
      handler: function (response) {
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
        setMessage('Booking and payment successful.');
      },
      prefill: {
        name: formData.name || 'Default Name', // Ensure name is provided
        email: formData.email || 'example@example.com', // Use dynamic user email
        contact: formData.contact || '9999999999' // Use dynamic user contact
      },
      theme: {
        color: '#3399cc'
      }
    };
  
    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error initializing payment:', error);
      setMessage('Failed to initiate payment. Please try again.');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingResponse = await axios.post('/api/bookings/book', formData);
      const { orderId, amount } = bookingResponse.data; // Server response should contain order ID and amount
      setMessage('Booking initiated. Proceeding to payment...');
      initiatePayment(orderId, amount); // Call Razorpay payment
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'Booking failed. Please try again.';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="dashboard">
      <main className="dashboard-content">
        <h2>Booking Trip: Mysore to Bangalore</h2>
        <p>Price per trip: ₹{tripPrice}</p>
        {message && <p className={message.includes('successful') ? 'success' : 'error'}>{message}</p>}
        <form onSubmit={handleSubmit} className="booking-form">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="passengers">Number of Passengers:</label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              value={formData.passengers}
              min="1"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Book Now</button>
        </form>
      </main>
    </div>
  );
};

export default Bookings;
