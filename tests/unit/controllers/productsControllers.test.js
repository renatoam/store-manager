const { expect } = require('chai');
const sinon = require('sinon');
const ProductsService = require('../../../services/productsService');
const ProductsController = require('../../../controllers/productsController');

describe('Products Controller Layer', () => {
  const request = {};
  const response = {};

	describe('test for getting all products', () => {
		describe('test if get all product controller is working properly', () => {
			before(async () => {
				sinon.stub(ProductsService, 'getAllProducts').resolves({
					code: 200,
					data: {},
				});

				response.status = sinon.stub().returns(response);
				response.json = sinon.stub().returns();
			});

			after(async () => ProductsService.getAllProducts.restore());

			it('should return status code 200', async () => {
				await ProductsController.getAllProducts(request, response);

        expect(response.status.calledWith(200)).to.be.true;
			});
		});
	});

	describe('test get by id', () => {
		describe('test if get by id works properly', () => {
			before(async () => {
				sinon.stub(ProductsService, 'getProductById').resolves();
        request.params = { id: 123 }
				response.status = sinon.stub().returns(response);
				response.json = sinon.stub().returns({
					id: 123,
          name: 'Pokeball',
				});
			});

			after(async () => ProductsService.getProductById.restore());

			it('should return the right product', async () => {
        const result = await ProductsController.getProductById(request, response)

				expect(result.name).to.be.equal('Pokeball');
			});
		});

		describe('Testa em caso de falha', () => {
      before(async () => {
        sinon.stub(ProductsService, 'getProductById').resolves();

        request.params = { id: 123 }
				response.status = sinon.stub().returns(response);
				response.json = sinon.stub().returns({
          error: {
            code: 404,
						message: 'Product not found',
					}
				});
			});

			after(async () => ProductsService.getProductById.restore());

			it('should return an error message', async () => {
				const result = await ProductsController.getProductById(request, response)

        expect(result.error.message).to.be.equal('Product not found');
			});

		});
  });

  describe('test to create a product', () => {
    describe('test for creating products properly', () => {
      before(async () => {
        sinon.stub(ProductsService, 'createProduct').resolves();

        request.body = { name: 'Pokeball' };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({
          id: 123,
          name: 'Pokeball',
        });
      });

      after(async () => ProductsService.createProduct.restore());

      it('should return created product', async () => {
        const result = await ProductsController.createProduct(request, response);

        expect(result.name).to.be.equal('Pokeball');
      });
    });
  });

  describe('test product update', () => {
    describe('test if products are being properly updated', () => {
      before(async () => {
        sinon.stub(ProductsService, 'updateProduct').resolves();

        request.params = { id: 123 };
        request.body = { name: 'Pokeball' };
        request.status = sinon.stub().returns({
          id: 123,
          name: 'Pokeball'
        });
      });

      after(async () => ProductsService.updateProduct.restore());

      it('should return the updated product', async () => {
        const result = await ProductsController.updateProduct(request, response);

        expect(result.name).to.be.equal('Pokeball');
      });
    });

    describe('test when product update fails', () => {
      before(async () => {
        sinon.stub(ProductsService, 'updateProduct').resolves();

        request.params = { id: 999 };
        request.body = { name: 'Master Sword' };
        response.json = sinon.stub().returns({
          error: {
            code: 404,
            message: 'Product not found',
          }
        });
      });

      after(async () => ProductsService.updateProduct.restore());

      it('should return message error', async () => {
        const result = await ProductsController.updateProduct(request, response);

        expect(result.error.message).to.be.equal('Product not found');
      });
    });
  });

  describe('test removing product', () => {
    describe('test if remove product controller works properly', () => {
      before(async () => {
        sinon.stub(ProductsService, 'deleteProduct').resolves({
          code: 204,
        });
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.end = sinon.stub().returns();
      });

      after(async () => ProductsService.deleteProduct.restore());

      it('should return status code 204', async () => {
        await ProductsController.deleteProduct(request, response);

        expect(response.status.calledWith(204)).to.be.true;
      });
    });

    describe('Testa em caso de falha', () => {
      before(async () => {
        sinon.stub(ProductsService, 'deleteProduct').resolves();

        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({
          error: {
            code: 404,
            message: 'Product not found',
          },
        });
      });

      after(async () => ProductsService.deleteProduct.restore());

      it('Verifica se o res.status é chamado com 204', async () => {
        const result = await ProductsController.deleteProduct(request, response);

        expect(result.error.message).to.be.equal('Product not found');
      });
    });
  });

  describe('test for getting product by name', () => {
    describe('test if search is working properly', () => {
      before(async () => {
        sinon.stub(ProductsService, 'getProductByName').resolves([{}]);

        request.query = { q: 'Pokeball' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns({
					id: 123,
          name: 'Pokeball',
				});
      });

      after(async () => ProductsService.getProductByName.restore());

      it('should return the searched product', async () => {
        const result = await ProductsController.getProductByName(request, response);

        expect(result.name).to.be.equal('Pokeball');
      });
    });
  });
});
