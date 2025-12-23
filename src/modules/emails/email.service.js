const Product = require('../products/product.model');

exports.processBulkProducts = async (products, sourceEmail) => {
  if (!products || !products.length) return { inserted: 0 };

  const incomingCodes = products.map(p => p.productCode);
  const incomingNames = products.map(p => p.name);

  const existingProducts = await Product.find({
    $or: [
      { productCode: { $in: incomingCodes } },
      { name: { $in: incomingNames } }
    ]
  }).select('productCode name');

  const existingCodes = new Set(existingProducts.map(p => p.productCode));
  const existingNames = new Set(existingProducts.map(p => p.name));

  const sanitized = products
    .filter(p => !existingCodes.has(p.productCode) && !existingNames.has(p.name))
    .map(p => ({ ...p, sourceEmail }));

  if (!sanitized.length) return { inserted: 0 };

  await Product.insertMany(sanitized, { ordered: false });
  return { inserted: sanitized.length };
};