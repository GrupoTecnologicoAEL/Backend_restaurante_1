require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
const productRoutes = require('./routers/products'); 
const categoryRoutes = require('./routers/categoryRouter');

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Usar las rutas de productos
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes); // Usa las rutas de categorías

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});





