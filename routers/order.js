const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Cart = require('../models/cart'); // Asumiendo que ya tienes el modelo de carrito


router.post('/create', async (req, res) => {
    try {
        //console.log(req.body);  // Verificar los datos que se reciben
        const { userId, name, address, phone, email, notes, items, totalPrice } = req.body;

        // Crear la nueva orden
        const newOrder = new Order({
            userId,
            name,
            address,
            phone,
            email,
            notes, // Notas opcionales
            items,
            totalPrice
        });

        const savedOrder = await newOrder.save();

        // Limpiar el carrito después de crear la orden
        await Cart.findOneAndDelete({ userId });

        res.status(201).json(savedOrder);
    } catch (error) {
        //console.error('Error al crear la orden:', error);
        res.status(500).json({ message: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find(); // Encuentra todas las órdenes en la base de datos
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener órdenes por usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }); // Encuentra todas las órdenes de un usuario específico
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener las órdenes del usuario:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
