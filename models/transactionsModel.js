const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    paymentMethod: { type: String, },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

/*
module.exports = mongoose.model('Order', orderSchema);
*/
module.exports = mongoose.models.Transactions || mongoose.model('Transactions', transactionSchema);