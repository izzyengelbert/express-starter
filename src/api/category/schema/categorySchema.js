import Joi from '@hapi/joi';

const categorySchema = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  query: Joi.object({
    abbreviation: Joi.string().max(5),
    description: Joi.string().max(15),
    active: Joi.string().max(15)
  }),
  deleteQuery: Joi.object({
    permanent: Joi.boolean().required()
  }),
  deleteByQuery: Joi.object({
    abbreviation: Joi.string().max(5).required()
  }),
  update: Joi.object({
    abbreviation: Joi.string().max(5),
    description: Joi.string().max(15)
  }),
  updateByAbbreviation: Joi.object({
    abbreviation: Joi.string().max(5).required()
  }),
  create: Joi.object({
    abbreviation: Joi.string().max(5).required(),
    description: Joi.string().max(15).required()
  })
};

export default categorySchema;
