const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Modelo de los productos 
const ProductsSchema = new Schema({
name: { type: String, required: true },
price: { type: Number, required: true },
description: { type: String, required: true },
imageUrl: { type: String, required: true },
category: { type: String, required: true } 
});

module.exports = mongoose.model('products', ProductsSchema);
