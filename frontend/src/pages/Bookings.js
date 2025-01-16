import React, { useState } from 'react';
import './Booking.css'; // Uncomment if styles are available
import Dashboard from './Dashboard';

const Bookings = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    passengers: 1,
  });

  const tripPrice = 2000; // Fixed price for the trip

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Booking Confirmed!\nName: ${formData.name}\nDate: ${formData.date}\nTime: ${formData.time}\nPassengers: ${formData.passengers}\nRoute: Mysore to Bangalore\nPrice: ₹${tripPrice}`
    );
    // Add your backend integration or further processing here
  };

  return (
    <div className="dashboard">
      <main className="dashboard-content">
      {/* <Dashboard/> */}
        <h2>Booking Trip: Mysore to Bangalore</h2>
        <p>Price per trip: ₹{tripPrice}</p>
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
