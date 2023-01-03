const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, },
        price: { type: Number, },
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
          //required: true,
        },
      },
    ],
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
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

//module.exports = mongoose.model('Order', orderSchema);
module.exports =
  mongoose.models.Order || mongoose.model('Order', orderSchema);