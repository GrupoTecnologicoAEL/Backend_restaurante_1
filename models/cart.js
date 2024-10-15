const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: { type: String, required: true }, // Cambia a String en lugar de ObjectId
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
