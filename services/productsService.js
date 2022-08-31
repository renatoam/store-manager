const ProductModel = require('../models/productsModel');

class ProductService {
  static async getAllProducts() {
    const products = await ProductModel.getAllProducts();

    return { code: 200, data: products };
  }

  static async getProductById(id) {
    const product = await ProductModel.getProductById(id);

    if (!product) return { error: { code: 404, message: 'Product not found' } };

    return { code: 200, data: product };
  }

  static async createProduct(productName) {
    const { id, name } = await ProductModel.createProduct(productName);
    return { code: 201, id, name };
  }

  static async updateProduct(id, name) {
    const checkIfProductExists = await ProductModel.getProductById(id);

    if (!checkIfProductExists) {
      return { error: { code: 404, message: 'Product not found' } };
    }

    const response = await ProductModel.updateProduct(id, name);
    return { code: 200, data: response };
  }

  static async deleteProduct(id) {
    const checkIfProductExists = await ProductModel.getProductById(id);

    if (!checkIfProductExists) {
      return { error: { code: 404, message: 'Product not found' } };
    }

    await ProductModel.deleteProduct(id);
    return { code: 204 };
  }

  static async getProductByName(name) {
    if (!name.length) {
      const emptyNameResponse = await ProductModel.getAllProducts();
      return { code: 200, data: emptyNameResponse };
    }

    const result = await ProductModel.getProductByName(name);
    return { code: 200, data: result };
  }
}

module.exports = ProductService;
