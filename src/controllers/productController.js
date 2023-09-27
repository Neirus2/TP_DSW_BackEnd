
// Importa el modelo de producto y cualquier otra dependencia necesaria
const Product = require('../models/product'); // Asegúrate de reemplazar con la ubicación correcta de tu modelo de producto

// Controlador para obtener la lista de productos
exports.getProducts = async (req, res) => {
  try {
    // Consulta la base de datos para obtener la lista de productos
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de productos.' });
  }
};