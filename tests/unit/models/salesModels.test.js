const { expect } = require('chai');
const sinon = require('sinon');
const SalesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Sales Model Layer', () => {
  describe('tests to get all the sales', () => {
    before(async () => {
      const mockResponse = [{
        saleId: 123,
        productId: 123,
        quantity: 10,
        date: new Date(),
      }]
      const modelResponse = [mockResponse[0]]

      sinon.stub(connection, 'execute').resolves(modelResponse);
    });

    after(async () => connection.execute.restore());

    it('should return an object with saleId equals to 123', async () => {
      const response = await SalesModel.getAll();

      expect(response).to.be.an('object');
      expect(response.saleId).to.be.equal(123);
    });

    it('should return a sale with product 123', async () => {
      const response = await SalesModel.getAll();

      expect(response.productId).to.be.equal(123);
    })
  });

  describe('test to get a sale by id', () => {
    before(async () => {
      const mockResponse = [{
        productId: 123,
        quantity: 10,
        date: new Date(),
      }]
      const modelResponse = [mockResponse[0]]

      sinon.stub(connection, 'execute').resolves(modelResponse);
    });

    after(async () => connection.execute.restore());

    it('should return an object with quantity equals to 10', async () => {
      const response = await SalesModel.getById(123);

      expect(response).to.be.an('object');
      expect(response.quantity).to.be.equal(10);
    });
  });

  describe('test to insert a new sale', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{
        insertId: 123,
      }]);
    });

    after(async () => connection.execute.restore());

    it('should return id from the new inserted sale', async () => {
      const { id } = await SalesModel.createSale();

      expect(id).equal(123);
    });
  });

  describe('test to insert a new relation sale_product', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(async () => connection.execute.restore());

    it('should be undefined', async () => {
      const response = await SalesModel.createSaleProduct();

      expect(response).to.be.undefined;
    });

  });

  describe('test to delete a sale', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(async () => connection.execute.restore());

    it('should return undefined', async () => {
      const response = await SalesModel.deleteSale();

      expect(response).to.be.undefined;
    });

  });

  describe('test to delete a relation', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(async () => connection.execute.restore());

    it('should be undefined', async () => {
      const response = await SalesModel.deleteSalesProducts();

      expect(response).to.be.undefined;
    });
  });
});
