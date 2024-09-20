const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Modelo de los productos 
const ProductsSchema = new Schema({
name: { type: String, required: true }, //para el nombre del producto 
price: { type: Number, required: true }, //precio del producto 
description: { type: String, required: true }, //descripcion del producto 
imageUrl: { type: String, required: true }, // iamgen del producto 
stock: { type: Number, required: true }, // almacena la cantidad de productos 
category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // categoria del producto 
createdAt: { type: Date, default: Date.now },  // Fecha de creación del producto
updatedAt: { type: Date, default: Date.now }   // Fecha de última actualización
});

module.exports = mongoose.model('products', ProductsSchema);
