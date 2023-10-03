const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

require('./database.js');

app.use('/api', require('./routes/user.js'));
app.use('/api', require('./routes/product.js'));
app.use('/api', require('./routes/supplier.js'));
app.use('/api', require('./routes/discount.js'));
app.use('/api', require('./routes/client.js'));
app.use('/api',require('./routes/upload-image-profile.js'));
app.use(require('./routes/enviar-correo.js'));
app.use('/uploadsProfileImages', express.static(path.join(__dirname, 'uploadsProfileImages')));


app.listen(3000);
console.log('Server running on port', 3000);

