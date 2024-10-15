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
        const orders = await Order.find().populate('items.productId', 'name price'); // Hacer populate de los productos
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
        res.status(500).json({ message: 'Error al obtener las órdenes.' });
    }
});

// Ruta para obtener órdenes por usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).populate('items.productId', 'name price'); // Ordenes por usuario
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener las órdenes del usuario:', error);
        res.status(500).json({ message: 'Error al obtener las órdenes del usuario.' });
    }
});
// Obtener una orden específica por ID
router.get('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('items.productId', 'name price');

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada.' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error al obtener la orden:', error);
        res.status(500).json({ message: 'Error al obtener la orden.' });
    }
});
// Actualizar el estado de una orden
router.put('/update-status/:id', async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado del pedido', error });
    }
});

module.exports = router;
