const connection = require('./connection');
const queries = require('../constants/queries');

class ProductModel {
  static async getAllProducts() {
    const [response] = await connection.execute(queries.GET_ALL_PRODUCTS);

    return response;
  }

  static async getProductById(id) {
    const [[response]] = await connection.execute(queries.GET_PRODUCTS_BY_ID, [id]);

    return response;
  }

  static async createProduct(name) {
    const [response] = await connection.execute(queries.INSERT_PRODUCT, [name]);

    return { id: response.insertId, name };
  }

  static async updateProduct(id, name) {
    await connection.execute(queries.UPDATE_PRODUCT, [name, id]);

    return { id, name };
  }

  static async deleteProduct(id) {
    await connection.execute(queries.DELETE_PRODUCT, [id]);

    return { id };
  }

  static async getProductByName(name) {
    const query = `SELECT * FROM StoreManager.products WHERE name LIKE '%${name}%'`;
    const [result] = await connection.execute(query);

    return result;
  }
}

module.exports = ProductModel;
