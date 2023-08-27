const express = require('express');
const app = express();

app.use(express.json());

require('./database.js');

app.use(require('./routes/index.js'))

app.listen(3000);
console.log('Server running on port', 3000);