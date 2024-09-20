const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true }, // Nombre de la categoría 
  description: { type: String },          // Descripción opcional para la categoría
  createdAt: { type: Date, default: Date.now } // Fecha de creación
});

module.exports = mongoose.model('Category', CategorySchema);
