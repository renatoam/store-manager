const SalesModel = require('../models/salesModel');

class SalesService {
  static async getAll() {
    return SalesModel.getAll();
  }

  static async getById(id) {
    const sales = await SalesModel.getById(id);

    if (!sales.length) {
      throw Error('Sale not found');
    }

    return sales;
  }

  static async createSale(sales) {
    const { id } = await SalesModel.createSale();
    const salesProductsRelations = sales.map(({ productId, quantity }) => (
      SalesModel.createSaleProduct(id, productId, quantity)
    ));

    await Promise.all(salesProductsRelations);
    return { id, itemsSold: sales };
  }

  static async deleteSale(saleId) {
    const isThereSale = await SalesModel.getById(saleId);

    if (!isThereSale.length) {
      throw Error('Sale not found');
    }

    try {
      await SalesModel.deleteSale(saleId);
    } catch (error) {
      throw Error('It was not possible to remove this sale');
    }
  }

  static async updateSale(saleId, sales) {
    const isThereSale = await SalesModel.getById(saleId);

    if (!isThereSale.length) {
      throw Error('Sale not found');
    }

    try {
      await SalesModel.deleteSalesProducts(saleId);
    } catch (error) {
      throw Error('It was not possible to update this sale');
    }

    const salesToCreate = sales.map(({ productId, quantity }) => (
      SalesModel.createSaleProduct(saleId, productId, quantity)
    ));

    try {
      await Promise.all(salesToCreate);
      return { saleId, itemsUpdated: sales };
    } catch (error) {
      throw Error('It was not possible to update this sale');
    }
  }
}

module.exports = SalesService;
