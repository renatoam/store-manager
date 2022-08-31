const ProductsService = require('../services/productsService');

class ProductsController {
  static async getAllProducts(_request, response) {
    try {
      const { code, data } = await ProductsService.getAllProducts();
      response.status(code).json(data);
    } catch (error) {
      return response.status(500).json({ error, message: 'Internal Server Error.' });
    }
  }

  static async getProductById(request, response) {
    const { id } = request.params;
    try {
      const { error, code, data } = await ProductsService.getProductById(id);
      if (error) return response.status(error.code).json({ message: error.message });
      return response.status(code).json(data);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  static async createProduct(request, response) {
    const { name } = request.body;
    try {
      const product = await ProductsService.createProduct(name);
      return response.status(product.code).json({
        id: product.id,
        name: product.name,
      });
    } catch (error) {
      return response.status(500).json({ error, message: 'Internal Server Error.' });
    }
  }

  static async updateProduct(request, response) {
    const { id } = request.params;
    const { name } = request.body;
    try {
      const { error, code, data } = await ProductsService.updateProduct(id, name);
      if (error) {
        return response.status(error.code).json({ message: error.message });
      }
      return response.status(code).json(data);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  static async deleteProduct(request, response) {
    const { id } = request.params;
    try {
      const { error, code } = await ProductsService.deleteProduct(id);
      if (error) {
        return response.status(error.code).json({ message: error.message });
      }
      return response.status(code).end();
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  static async getProductByName(request, response) {
    const { q } = request.query;
    try {
      const { code, data } = await ProductsService.getProductByName(q);
      return response.status(code).json(data);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
}

module.exports = ProductsController;
