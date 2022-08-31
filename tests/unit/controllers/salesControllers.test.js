const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('Sales Controller Layer', () => {
  const request = {};
  const response = {};

  describe('tests to get all sales', () => {
    describe('test if get all sales controller works properly', () => {
      before(async () => {
        sinon.stub(salesService, 'getAll').resolves([{}]);

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });

      after(async () => salesService.getAll.restore());

      it('should be called with the proper status code', async () => {
        await salesController.getAll(request, response);

        expect(response.status.calledWith(200)).to.be.true;
      });
    });

    describe('test if get sales controller fails', () => {
      before(async () => {
        sinon.stub(salesService, 'getAll').rejects();
      });

      after(async () => salesService.getAll.restore());

      it('should return server error code', async () => {
        await salesController.getAll(request, response);

        expect(response.status.calledWith(500)).to.be.true;
      });
    });
  });

  describe('test get sale by id controller', () => {
    describe('test if get sale by id controller works properly', () => {
      before(async () => {
        sinon.stub(salesService, 'getById').resolves([{}]);
        const mockResponse = {
          date: "2022-08-30T22:32:43.000Z",
          productId: 123,
          quantity: 10
        }
        request.params = { id: 123 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(mockResponse);
      });

      after(async () => salesService.getById.restore());

      it('should return productId 123', async () => {
        const result = await salesController.getById(request, response);

        expect(result.productId).to.be.equal(123);
      });

    });

    describe('test when get sales by id controller fails', () => {
      before(async () => {
        sinon.stub(salesService, 'getById').resolves('Sale not found');
        request.params = { id: 123 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({ message: 'Sale not found' });
      });

      after(async () => salesService.getById.restore());

      it('should return a message "Sale not found"', async () => {
        const result = await salesController.getById(request, response);

        expect(result.message).to.be.equal('Sale not found');
      });
    });
  });

  describe('test for creating sale', () => {
    describe('test if sale is created properly', () => {
      before(async () => {
        sinon.stub(salesService, 'createSale').resolves([{}]);
        const mockResponse = [
          {
            date: "2022-08-30T22:32:43.000Z",
            productId: 123,
            quantity: 10
          },
          {
            date: "2022-08-30T22:32:43.000Z",
            productId: 124,
            quantity: 15
          }
        ]
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(mockResponse);
      });

      after(async () => {
        salesService.createSale.restore();
      });

      it('should return the proper response and status code', async () => {
        const result = await salesController.createSale(request, response);

        expect(result[0].quantity).to.be.equal(10)
        expect(result[1].quantity).to.be.equal(15)
        expect(response.status.calledWith(201)).to.be.true;
      });

    });
  });

  describe('test remove sale controller', () => {
    describe('test if sales controller remove sale properly', () => {
      before(async () => {
        sinon.stub(salesService, 'deleteSale').resolves();
        request.params = { id: 123 };
        response.status = sinon.stub().returns(response);
        response.end = sinon.stub().returns();
      });

      after(async () => {
        salesService.deleteSale.restore();
      });

      it('should not contain a response', async () => {
        const result = await salesController.deleteSale(request, response);

        expect(result).to.be.undefined;
      });

      it('should return status code 204', async () => {
        await salesController.deleteSale(request, response);

        expect(response.status.calledWith(204)).to.be.true;
      });

    });
  });

  describe('test update sale controller', () => {
    describe('test if update sale controller works properly', () => {
      before(async () => {
        sinon.stub(salesService, 'updateSale').resolves([{}]);
        const mockResponse = {
          date: "2022-08-30T22:32:43.000Z",
          productId: 123,
          quantity: 10
        }
        request.params = { id: 123 };
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(mockResponse);
      });

      after(async () => {
        salesService.updateSale.restore();
      });

      it('should return the updated sale', async () => {
        const sale = await salesController.updateSale(request, response);

        expect(sale.productId).to.be.equal(request.params.id);
      });

    });

    describe('test when update sales controller fails', () => {
      before(async () => {
        sinon.stub(salesService, 'updateSale').resolves({ message: 'Sale not found' });
        request.params = { id: 123 };
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({ message: 'Sale not found' });
      });

      after(async () => {
        salesService.updateSale.restore();
      });

      it('should return message "Sales not found"', async () => {
        const result = await salesController.updateSale(request, response);

        expect(result.message).to.be.equal('Sale not found')
      });
    });
  });
});
