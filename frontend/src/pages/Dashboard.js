// src/Dashboard.js
import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Bookings from './Bookings';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="side-menu">
        <ul>
          <li><Link to="/booking">Booking</Link></li>
          <li><Link to="/booking-history">Booking History</Link></li>
          <li><Link to="/show-booking">Show Booking</Link></li>
          <li><Link to="/transaction">Transaction</Link></li>
        </ul>
      </aside>
      <main className="dashboard-content">
        <h2>Dashboard</h2>
        <p>Welcome to the dashboard!</p>
         <Bookings/>
      </main>
    </div>
  );
};

export default Dashboard;
