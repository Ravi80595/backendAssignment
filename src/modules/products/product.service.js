const Product = require('./product.model');

exports.createProduct = async (payload, email) => {
  return Product.create({ ...payload, sourceEmail: email });
};