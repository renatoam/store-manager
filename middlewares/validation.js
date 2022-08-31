const ProductModel = require('../models/productsModel');

const checkProductName = (request, response, next) => {
  const { name } = request.body;

  if (!name) {
    return response.status(400)
      .json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return response.status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const checkProductQuantity = (request, response, next) => {
  const isThereQuantityZero = request.body
    .some((product) => product.quantity < 1);

  if (isThereQuantityZero) {
    return response.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  const isMissingQuantity = request.body
    .some((product) => !product.quantity);

  if (isMissingQuantity) return response.status(400).json({ message: '"quantity" is required' });

  next();
};

const checkProductId = async (request, response, next) => {
  const isThereInvalidId = request.body.some((product) => !product.productId);

  if (isThereInvalidId) {
    return response.status(400).json({ message: '"productId" is required' });
  }

  const fetchProducts = request.body.map(async (product) =>
      ProductModel.getProductById(product.productId));
  const products = await Promise.all(fetchProducts);

  if (products.some((product) => !product)) {
    return response.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  checkProductName,
  checkProductQuantity,
  checkProductId,
};
