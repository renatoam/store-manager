const connection = require('./connection');
const queries = require('../constants/queries');

class SalesModel {
  static async getAll() {
    const [response] = await connection.execute(queries.GET_ALL_SALES);

    return response;
  }

  static async getById(saleId) {
    const [response] = await connection.execute(queries.GET_SALE_BY_ID, [saleId]);

    return response;
  }

  static async createSale() {
    const [response] = await connection.execute(queries.INSERT_SALE);

    return { id: response.insertId };
  }

  static async createSaleProduct(saleId, productId, quantity) {
    await connection.execute(queries.INSERT_SALE_PRODUCT, [saleId, productId, quantity]);
  }

  static async deleteSale(saleId) {
    await connection.execute(queries.DELETE_SALE, [saleId]);
  }

  static async deleteSalesProducts(saleId) {
    await connection.execute(queries.DELETE_SALE_PRODUCT, [saleId]);
  }
}

module.exports = SalesModel;
