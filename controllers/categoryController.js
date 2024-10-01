const Category = require('../models/category'); // Importa el modelo de categoría
const Product = require('../models/product');

// Crear nueva categoría
const createCategory = async (req, res) => {
    try {
        const newCategory = new Category({
            name: req.body.name,
            description: req.body.description
        });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener categoría por ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verificar si una categoría tiene productos asociados
const hasProducts = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id });
        if (products.length > 0) {
            res.json({ hasProducts: true });
        } else {
            res.json({ hasProducts: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verificando si la categoría tiene productos asociados' });
    }
};

// Actualizar categoría
const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar categoría (solo si no tiene productos asociados)
const deleteCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id });
        if (products.length > 0) {
            return res.status(400).json({ message: 'No se puede eliminar la categoría porque tiene productos asociados' });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Categoría eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    hasProducts,
    updateCategory,
    deleteCategory
};
