import Joi from '@hapi/joi';

const productSchema = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  query: Joi.object({
    description: Joi.string().max(100),
    productId: Joi.string().max(15),
    categoryId: Joi.number(),
    categoryAbbreviation: Joi.string().max(5),
    createdAt: Joi.string(),
    updatedAt: Joi.string(),
    active: Joi.boolean()
  }),
  update: Joi.object({
    description: Joi.string().max(100),
    categoryId: Joi.number(),
    stock: Joi.number(),
    cost: Joi.number(),
    normalPrice: Joi.number(),
    bottomPrice: Joi.number().allow(null),
    topPrice: Joi.number().allow(null),
    uom: Joi.string().max(10),
    active: Joi.boolean()
  }),
  create: Joi.object({
    description: Joi.string().max(100).required(),
    categoryAbbreviation: Joi.string().max(5).required(),
    stock: Joi.number().required(),
    cost: Joi.number().required(),
    normalPrice: Joi.number().required(),
    bottomPrice: Joi.number().allow(null),
    topPrice: Joi.number().allow(null),
    uom: Joi.string().max(10).required(),
    active: Joi.boolean().required()
  })
};

export default productSchema;
