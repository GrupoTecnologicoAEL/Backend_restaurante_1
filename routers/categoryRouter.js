const express = require('express');
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    hasProducts
} = require('../controllers/categoryController'); 

// Crear nueva categoría
router.post('/', createCategory);

// Obtener todas las categorías
router.get('/', getAllCategories);

// Obtener categoría por ID
router.get('/:id', getCategoryById);

// Verificar si una categoría tiene productos asociados
router.get('/:id/hasProducts', hasProducts);

// Actualizar categoría
router.put('/:id', updateCategory);

// Eliminar categoría
router.delete('/:id', deleteCategory);

module.exports = router;
