const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Modelo del carrito
const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // El usuario propietario del carrito
    products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Producto en el carrito
      quantity: { type: Number, required: true }, // Cantidad de productos
    }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
