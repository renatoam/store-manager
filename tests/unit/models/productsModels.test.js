const { expect } = require('chai');
const sinon = require('sinon');
const ProductsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('Products Model Layer', () => {
  describe('tests to get all the products', () => {
    const mockResponse = [
      {
        id: 123,
        name: "Excalibur"
      },
      {
        id: 234,
        name: "Rebellion"
      }
    ];

    before(async () => {
      sinon.stub(connection, 'execute').resolves([mockResponse])
    });

    after(async () => connection.execute.restore());

    it('should return the correct result', async () => {
      const response = await ProductsModel.getAllProducts();

      expect(response[1].id).to.be.equal(234);
    });

    it('should contain right quantity of products', async () => {
      const response = await ProductsModel.getAllProducts();

      expect(response).to.have.lengthOf(2);
    });

  });

  describe('test to get a product by id', () => {
    describe('should be able to get products by their id', () => {
      const mockResponse = [{
        id: 123,
        name: "Mushroom",
      }];

      before(async () => {
        sinon.stub(connection, 'execute').resolves([mockResponse]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('should return the right product name', async () => {
        const response = await ProductsModel.getProductById(123);

        expect(response.name).to.be.equal(mockResponse[0].name);
      });

      it('should have an id', async () => {
        const response = await ProductsModel.getProductById(1);

        expect(response).to.haveOwnProperty('id');
      });

    });

    describe('test when get product by id fails', () => {

      before(async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(async () => connection.execute.restore());

      it('should return undefined', async () => {
        const response = await ProductsModel.getProductById(123);

        expect(response).to.be.undefined;
      });

    });

  });

  describe('test create products', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 123 }]);
    });

    after(async () => connection.execute.restore());

    it('should create a pokeball', async () => {
      const response = await ProductsModel.createProduct('pokeball');

      expect(response.id).to.be.equal(123);
      expect(response.name).to.be.equal('pokeball');
    });
  });

  describe('test update products', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(async () => connection.execute.restore());

    it('should return the updated product', async () => {
      const response = await ProductsModel.updateProduct(1, 'pokeball');

      expect(response.name).to.be.equal('pokeball');
    });
  });

  describe('test remove products', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(async () => connection.execute.restore());

    it('should remove the product properly', async () => {
      const response = await ProductsModel.deleteProduct(123);

      expect(response).to.be.an('object');
    });

  });

  describe('search for a product by its name', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[{
        id: 123,
        name: 'Eren Jaeger',
      }]]);
    });

    after(async () => connection.execute.restore());

    it('should return the searched product', async () => {
      const response = await ProductsModel.getProductByName('Eren');

      expect(response[0].name).to.contains('Jaeger');
    });
  });
});
