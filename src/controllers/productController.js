
const Product = require('../models/product'); 

// Controlador para obtener la lista de productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de productos.' });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: 'true' });
    res.json(featuredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de productos destacados.' });
  }
}

exports.getNoStockProducts = async (req, res) => {
  try {
    const noStockProducts = await Product.find({
      $expr: {
        $lt: ["$stock", "$stockMin"]
      }
    });
    res.json(noStockProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de productos sin stock.' });
  }
}