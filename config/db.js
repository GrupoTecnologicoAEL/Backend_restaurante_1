const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
try {
    await mongoose.connect(process.env.DB_URI, {
    });
    console.log('Conexión exitosa a la base de datos');
} catch (err) {
    console.error('Error de conexión a la base de datos', err);
    process.exit(1); 
}
};

module.exports = connectDB;
