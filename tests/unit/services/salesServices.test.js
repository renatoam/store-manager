const { expect } = require('chai');
const sinon = require('sinon');
const SalesModel = require('../../../models/salesModel');
const SalesService = require('../../../services/salesService');

describe('Sales Service Layer', () => {
  describe('tests to get all sales', () => {

    before(async () => {
      sinon.stub(SalesModel, 'getAll').returns([{}]);
    });

    after(async () => SalesModel.getAll.restore());

    it('should return an object', async () => {
      const response = await SalesService.getAll();

      expect(response[0]).to.be.an('object');
    });
  });

  describe('tests to get sale by id', () => {

    describe('tests to get sale by id properly', () => {
      before(async () => {
        sinon.stub(SalesModel, 'getById').returns([{}]);
      });

      after(async () => SalesModel.getById.restore());

      it('should be an empty object', async () => {
        const response = await SalesService.getById();

        expect(Object.keys(response[0])).to.have.length.lessThanOrEqual(0)
      });
    });

    describe('tests if service fails', () => {
      before(async () => {
        sinon.stub(SalesModel, 'getById').returns([]);
      });

      after(async () => SalesModel.getById.restore());

      it('should return "Sale not found" message', async () => {
        let response

        try {
          response = await SalesService.getById();
        } catch (error) {
          response = error.message
        }

        expect(response).to.be.equal('Sale not found');
      });

    });
  });

  describe('tests to create a sale', () => {
    before(async () => {
      sinon.stub(SalesModel, 'createSale').resolves({
        id: 3,
      });

      sinon.stub(Promise, 'all').resolves();
    });

    after(async () => {
      SalesModel.createSale.restore();
      Promise.all.restore();
    });

    it('should return a sale with productId 123', async () => {
      const mockResponse = {
        productId: 123,
        quantity: 10,
      }
      const response = await SalesService.createSale([mockResponse]);

      expect(response.itemsSold[0].productId).to.be.equal(123);
    });

  });

  describe('tests to remove a sale', () => {
    describe('tests if remove sale service works properly', () => {
      before(async () => {
        sinon.stub(SalesModel, 'getById').resolves([{}]);

        sinon.stub(SalesModel, 'deleteSale').resolves();
      });

      after(async () => {
        SalesModel.getById.restore();
        SalesModel.deleteSale.restore();
      });

      it('should return undefined', async () => {
        const response = await SalesService.deleteSale(3);

        expect(response).to.be.undefined;
      });

    });

    describe('tests when remove sale service fails', () => {
      before(async () => {
        sinon.stub(SalesModel, 'getById').resolves([]);
      });

      after(async () => {
        SalesModel.getById.restore();
      });

      it('should return a message "Sale not found"', async () => {
        let response

        try {
          response = await SalesService.deleteSale(99);
        } catch (error) {
          response = error.message
        }

        expect(response).to.be.equal('Sale not found');
      });

    });
  });

  describe('tests to update a sale', () => {
    describe('test if update sale service works properly', () => {
      before(async () => {
        sinon.stub(SalesModel, 'getById').resolves([{}]);
        sinon.stub(SalesModel, 'deleteSalesProducts').resolves();
        sinon.stub(Promise, 'all').resolves();
      });

      after(async () => {
        SalesModel.getById.restore();
        SalesModel.deleteSalesProducts.restore();
        Promise.all.restore();
      });

      it('should return the proper data: saleId, quantity and the right structure', async () => {
        const mockId = 2
        const mockPayload = {
          productId: 123,
          quantity: 10
        }

        const response = await SalesService.updateSale(mockId, [mockPayload]);

        expect(response.saleId).to.be.equal(mockId);
        expect(response.itemsUpdated[0]).to.have.keys('productId', 'quantity');
        expect(response.itemsUpdated[0].quantity).to.be.equal(10);
      });

    });

    describe('tests when update sale service fails', () => {
      before(async () => {
        sinon.stub(SalesModel, 'getById').resolves([]);
      });

      after(async () => {
        SalesModel.getById.restore();
      });

      it('should return message "Sale not found"', async () => {
        let response

        try {
          response = await SalesService.updateSale(99);
        } catch (error) {
          response = error.message
        }

        expect(response).to.be.equal('Sale not found');
      });
    });
  });
});
