const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const Product = require('../models/product');
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadsProductsImages/'); // Directorio donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  },
});

const upload = multer({ storage });


router.get('/searchProducts/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm; // Utiliza 'search' en lugar de 'searchTerm'
  try {
    console.log(searchTerm, 'back');
    // Realiza la búsqueda en la base de datos utilizando el término de búsqueda
    const products = await Product.find({ desc: { $regex: searchTerm, $options: 'i' } });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos' });
    }

    // Devuelve la lista de productos filtrados como respuesta
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar productos' });
  }
});


router.get('/products', productController.getProducts);

router.post('/createNewProduct', upload.single('image'), async (req, res) => {
  const { desc, stock, price } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha adjuntado una imagen' });
  }
  
  const imageFileName = req.file.filename; // Nombre del archivo en el servidor
  const image = 'uploadsProductsImages/' + imageFileName; // Ruta relativa de la imagen

  const newProduct = new Product({ desc, stock, price, image });
  const token = jwt.sign({ _id: newProduct._id }, 'secretKey');
  await newProduct.save();
  res.status(200).json({ token });
});

router.get('/product/:productId', async(req, res) => {
 
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).send("Producto no existe");

  const productDetails = {
    _id: product._id,
    desc: product.desc,
    stock: product.stock,
    price: product.price,
    image: `http://localhost:3000/${product.image}` // Asegúrate de que la ruta sea correcta
  };

  res.json(productDetails);
});

  router.delete('/product/:productId', async (req, res) => {
    const productId = req.params.productId;
  
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);  
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  });
    
  router.patch('/product/:productId', async (req, res) => {
    const productId = req.params.productId;
    const { desc, stock, price } = req.body;
    const updateOps = {desc, stock, price}
  
    try {
      const result = await Product.findByIdAndUpdate( productId, updateOps );
  
      if (!result) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      const product = await Product.findById( productId )
  
      res.json({ data: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  });

  



  module.exports = router;