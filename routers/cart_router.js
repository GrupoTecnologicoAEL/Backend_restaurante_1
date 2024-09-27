const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // Modelo del carrito

// Agregar producto al carrito
router.post('/add', async (req, res) => {
try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Si el carrito ya existe, actualiza la cantidad del producto
    const productIndex = cart.products.findIndex(p => p.productId == productId);

    if (productIndex > -1) {
        let productItem = cart.products[productIndex];
        productItem.quantity += quantity;
        cart.products[productIndex] = productItem;
    } else {
        cart.products.push({ productId, quantity });
    }
    cart = await cart.save();
    return res.status(200).send(cart);
    } else {
      // Si no existe el carrito, crea uno nuevo
    const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity }],
    });
    return res.status(201).send(newCart);
    }
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

// Ver el contenido del carrito
router.get('/:userId', async (req, res) => {
try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

// Eliminar producto del carrito
router.delete('/:userId/product/:productId', async (req, res) => {
try {
    const { userId, productId } = req.params;
    let cart = await Cart.findOne({ userId });

    if (cart) {
    cart.products = cart.products.filter(p => p.productId != productId);
    cart = await cart.save();
    return res.status(200).json(cart);
    } else {
    return res.status(404).json({ message: 'Carrito no encontrado' });
    }
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

module.exports = router;
