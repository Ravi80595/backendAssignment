const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  productCode: Joi.string().required(),
  price: Joi.number().positive().required()
});

exports.validateCreate = (req, res, next) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};