import React, { useState } from 'react';
import './Booking.css';
import axios from 'axios';

const Bookings = () => {
  const [formData, setFormData] = useState({ name: '', email: '', contact: '', date: '', time: '', passengers: 1 });
  const [message, setMessage] = useState('');
  const tripPrice = 1500; // Define the trip price or fetch from server if dynamic

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const initiatePayment = async (orderId, tripPrice) => {
    const options = {
      key: 'rzp_test_K0RlwZlz7o5u1K', // Use your Razorpay key securely
      amount: tripPrice , // Amount in paise
      currency: 'INR',
      name: 'Sk Travel',
      description: 'Trip Booking',
      order_id: orderId,
      handler: async function (response) {
        try {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
          setMessage('Booking and payment successful.');
      
          const paymentData = {
            paymentId: response.razorpay_payment_id,  // Important for verification
            amount: 1500,
          };
      console.log(paymentData)
          // Send payment details to the backend
          await axios.post('/api/bookpayment/paymentsuccess', paymentData);
        } catch (error) {
          console.error('Failed to store payment data:', error);
          setMessage('Payment succeeded, but failed to store payment data. Please contact support.');
        }
      },
      
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
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
      const { orderId, amount } = bookingResponse.data;
      setMessage('Booking initiated. Proceeding to payment...');
      initiatePayment(orderId, amount);
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="contact">Contact:</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
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
