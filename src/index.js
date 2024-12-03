require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar el usuario administrador y la base de datos
require('./initAdminUser');
require('./database.js');

// Rutas
app.use('/api', require('./routes/user.js'));
app.use('/api', require('./routes/product.js'));
app.use('/api', require('./routes/order.js'));
app.use('/api', require('./routes/supplier.js'));
app.use('/api', require('./routes/discount.js'));
app.use('/api', require('./routes/upload-image-profile.js'));

// Rutas estáticas para imágenes
app.use('/uploadsProfileImages', express.static(path.join(__dirname, 'uploadsProfileImages')));
app.use('/uploadsProductsImages', express.static(path.join(__dirname, 'uploadsProductsImages')));

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor');
});

// Exportar la app sin iniciar el servidor
module.exports = app;
