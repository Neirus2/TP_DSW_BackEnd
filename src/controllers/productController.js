
const Product = require('../models/product'); 

// Controlador para obtener la lista de productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    console.log('HOLAAAAA')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de productos.' });
  }
};