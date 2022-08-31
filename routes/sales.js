const express = require('express');
const SalesController = require('../controllers/salesController');
const { checkProductId, checkProductQuantity } = require('../middlewares/validation');

const sales = express.Router();

sales.get('/', SalesController.getAll);
sales.get('/:id', SalesController.getById);
sales.delete('/:id', SalesController.deleteSale);
sales.post('/', checkProductId, checkProductQuantity, SalesController.createSale);
sales.put('/:id', checkProductId, checkProductQuantity, SalesController.updateSale);

module.exports = sales;
