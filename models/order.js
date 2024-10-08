const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true }, // Nombre del cliente
    address: { type: String, required: true }, // Dirección completa
    phone: { type: String, required: true }, // Número de teléfono
    email: { type: String, required: true }, // Correo electrónico
    notes: { type: String }, // Notas opcionales
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pendiente' }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
