const SalesService = require('../services/salesService');

class SalesController {
  static async getAll(_, response) {
    try {
      const sales = await SalesService.getAll();

      return response.status(200).json(sales);
    } catch (error) {
      return response.status(500).json({ error, message: 'Internal Server Error.' });
    }
  }

  static async getById(request, response) {
    const { id } = request.params;

    try {
      const sale = await SalesService.getById(id);

      return response.status(200).json(sale);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  static async createSale(request, response) {
    const sales = await SalesService.createSale(request.body);

    return response.status(201).json(sales);
  }

  static async deleteSale(request, response) {
    const { id } = request.params;

    try {
      await SalesService.deleteSale(id);
      return response.status(204).end();
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  static async updateSale(request, response) {
    const { id } = request.params;

    try {
      const sales = await SalesService.updateSale(id, request.body);

      return response.status(200).json(sales);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
}

module.exports = SalesController;
