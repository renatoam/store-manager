const express = require('express');
const ProductsController = require('../controllers/productsController');
const { checkProductName } = require('../middlewares/validation');

const products = express.Router();

products.get('/', ProductsController.getAllProducts);
products.get('/search', ProductsController.getProductByName);
products.get('/:id', ProductsController.getProductById);
products.delete('/:id', ProductsController.deleteProduct);
products.post('/', checkProductName, ProductsController.createProduct);
products.put('/:id', checkProductName, ProductsController.updateProduct);

module.exports = products;
