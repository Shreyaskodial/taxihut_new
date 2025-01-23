const mongoose = require('mongoose');

const paymentTransactionSchema = new mongoose.Schema({
  // orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  // signature: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'success' },
  date: { type: Date, default: Date.now }
});

// module.exports = mongoose.model('PaymentTransaction', paymentTransactionSchema);
const PaymentTransaction = mongoose.model('PaymentTransaction', paymentTransactionSchema);

module.exports = PaymentTransaction;