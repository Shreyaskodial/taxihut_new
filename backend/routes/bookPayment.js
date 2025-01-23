const express = require('express');
const PaymentTransaction = require('../models/PaymentTransaction');
const router = express.Router();
// const { PaymentTransaction } = require('../models/PaymentTransaction');  // Import your model


// Route to handle payment success
router.post('/paymentsuccess', async (req, res) => {
    console.log('enter');
  try {
    const {  paymentId,  amount } = req.body;

    // Create a new payment transaction record
    const paymentTransaction = new PaymentTransaction ({
      // orderId,
      paymentId,
      // signature,
      amount,
      status: 'success',  // Add status to indicate success
      date: new Date()
    });
console.log(paymentTransaction);

    await paymentTransaction.save();
    res.status(200).json({ message: 'Payment details stored successfully.' });
  } catch (error) {
    console.error('Error saving payment details:', error);
    res.status(500).json({ message: 'Failed to store payment data.' });
  }
});

module.exports = router;
