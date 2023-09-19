const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

require('./database.js');

// No necesitas el prefijo /api aquí, ya que lo incluiste en enviar-correo.js
app.use('/api', require('./routes/user.js'));
app.use('/api', require('./routes/product.js'));
app.use('/api', require('./routes/supplier.js'));
app.use('/api', require('./routes/discount.js'));
app.use('/api', require('./routes/client.js'));

// Incluye enviar-correo.js sin el prefijo /api
app.use(require('./routes/enviar-correo.js'));

app.listen(3000);
console.log('Server running on port', 3000);
