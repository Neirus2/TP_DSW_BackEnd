const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


require('./database.js');

app.use('/api', require('./routes/index.js'));
app.use('/api', require('./routes/product.js'));
app.use('/api', require('./routes/supplier.js'));
app.use('/api', require('./routes/discount.js'));
app.use('/api', require('./routes/client.js'));



app.listen(3000);
console.log('Server running on port', 3000);
