import Joi from '@hapi/joi';

const userSchema = {
  parameter: Joi.object().keys({
    id: Joi.number().required()
  }),
  query: Joi.object().keys({
    username: Joi.string().min(12).max(20)
  })
};

export default userSchema;
