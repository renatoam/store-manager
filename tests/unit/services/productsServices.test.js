const { expect } = require('chai');
const sinon = require('sinon');
const ProductsModel = require('../../../models/productsModel');
const ProductsService = require('../../../services/productsService');

describe('Product Service Layer', () => {
  describe('test get all the products', () => {
    before(async () => {
      sinon.stub(ProductsModel, 'getAllProducts').resolves([{
        id: 123,
        name: "Excalibur"
      }]);
    });

    after(async () => ProductsModel.getAllProducts.restore());

    it('should return the correct result', async () => {
      const response = await ProductsService.getAllProducts();

      expect(response.data[0].name).to.be.equal('Excalibur');
    });

    it('should return array of objects', async () => {
      const response = await ProductsService.getAllProducts();

      expect(response.data).to.be.an('array');
    });
  });

  describe('test get product by id', () => {
    describe('test if get product by id works properly', () => {
      before(async () => {
        sinon.stub(ProductsModel, 'getProductById').resolves({
          id: 123,
          name: "Excalibur"
        });
      });

      after(async () => sinon.stub(ProductsModel.getProductById.restore()));

      it('should return the right product', async () => {
        const response = await ProductsService.getProductById(123);

        expect(response.data.name).to.be.equal('Excalibur');
      });

      it('should return a code property', async () => {
        const response = await ProductsService.getProductById(123);

        expect(response).to.haveOwnProperty('code');
      });

      it('should return a data property', async () => {
        const response = await ProductsService.getProductById(123);

        expect(response).to.haveOwnProperty('data');
      });
    });
  });

  describe('test insert a new product', () => {
    before(async () => {
      sinon.stub(ProductsModel, 'createProduct').returns({
        id: 123,
        name: "Mushroom",
      });
    });

    after(async () => ProductsModel.createProduct.restore());

    it('should return the created product', async () => {
      const response = await ProductsService.createProduct('Mushroom');

      expect(response.name).to.be.equal('Mushroom');
    });

    it('should return the proper id', async () => {
      const response = await ProductsService.createProduct('Mushroom');

      expect(response.id).to.be.equal(123);
    });
  });

  describe('test update a product', () => {
    describe('test if is updating a product properly', () => {
      before(async () => {
        sinon.stub(ProductsModel, 'getProductById').resolves({
          true: true,
        });

        sinon.stub(ProductsModel, 'updateProduct').resolves({
          id: 123,
          name: "Mushroom",
        });
      });

      after(async () => {
        ProductsModel.getProductById.restore();
        ProductsModel.updateProduct.restore();
      });

      it('should return the data property', async () => {
        const response = await ProductsService.updateProduct(123, 'Mushroom');

        expect(response).to.haveOwnProperty('data');
      });

      it('should return the data property containing the updated product', async () => {
        const response = await ProductsService.updateProduct(123, 'Mushroom');

        expect(response.data.id).to.be.equal(123);
      });
    });

    describe('test when there is no such product', () => {
      before(async () => {
        sinon.stub(ProductsModel, 'getProductById').resolves();

        sinon.stub(ProductsModel, 'updateProduct').resolves();
      });

      after(async () => {
        ProductsModel.getProductById.restore();
        ProductsModel.updateProduct.restore();
      });

      it('should return status code 404', async () => {
        const response = await ProductsService.updateProduct(432, 'Mushroom');

        expect(response.error.code).to.be.equal(404);
      });

      it('should return message "Product not found"', async () => {
        const response = await ProductsService.updateProduct(123, 'Mushroom');

        expect(response.error.message).to.be.equal('Product not found');
      });
    });
  });

  describe('test removing a product', () => {
    describe('test removing a product properly', () => {
      before(async () => {
        sinon.stub(ProductsModel, 'getProductById').resolves({
          true: true,
        });

        sinon.stub(ProductsModel, 'deleteProduct').resolves();
      });

      after(async () => {
        ProductsModel.getProductById.restore();
        ProductsModel.deleteProduct.restore();
      });

      it('Verifica se retona um obejto com code 204', async () => {
        const response = await ProductsService.deleteProduct(123);

        expect(response).to.be.an('object');
        expect(response).to.have.key('code');
      });
    });
  });

  describe('test get a product by name', () => {
    describe('test getting a product properly', () => {
      before(async () => {
        sinon.stub(ProductsModel, 'getProductByName').resolves([{
          id: 123,
          name: 'Eren Jaeger',
        }]);
      });

      after(async () => ProductsModel.getProductByName.restore());

      it('should return the proper product', async () => {
        const response = await ProductsService.getProductByName('Eren');

        expect(response.data[0].name).to.contains('Jaeger');
      });

    });

    describe('test if there is no such product', () => {
      before(async () => {
        sinon.stub(ProductsModel, 'getAllProducts').resolves([]);
      });

      after(async () => ProductsModel.getAllProducts.restore());

      it('should return an empty array', async () => {
        const response = await ProductsService.getProductByName('');

        expect(response.data.length).to.be.equal(0);
      });
    });
  });
});
