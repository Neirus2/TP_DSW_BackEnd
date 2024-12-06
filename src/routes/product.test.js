//Test de integracion. Incluimos BD testing, API GET /product/:productId

//require('dotenv').config({ path: './.env.test' }); // Cargar variables de entorno

const request = require('supertest');
const {app, server} = require('../index');
const mongoose = require('mongoose');
const disconnectDB = require('../database');
const Product = require('../models/product');

describe('GET /product/:productId', () => {
  let product;

  beforeAll(async () => {
    //await mongoose.connect(process.env.DB_NAME); // Conexión con URI definida en .env
    product = new Product({
      desc: "Producto de prueba",
      stock: 10,
      price: 100,
      cat: "Categoría 1",
      featured: true,
      stockMin: 2,
      supplier: "Proveedor 1",
      image: "imagen.jpg",
    });
    await product.save();
  });

  afterAll(async () => {
    await Product.deleteMany();
    await disconnectDB();
    server.close();
  });

  it('should return product details when the product exists', async () => {
    const res = await request(app).get(`/api/product/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      _id: product._id.toString(),
      desc: product.desc,
      stock: product.stock,
      price: product.price,
      cat: product.cat,
      featured: product.featured,
      stockMin: product.stockMin,
      supplier: product.supplier,
      image: expect.any(String),
    });
    //console.log(res.body);
  });

  it('should return 404 when the product does not exist', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/product/${nonExistentId}`);
    //console.log(res.text);
    //console.log(res.statusCode);
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("Producto no existe");
  });
});