import createError from 'http-errors';

const { BadRequest } = createError;
const validation = (schema, property) => async (req, res, next) => {
  try {
    await schema.validateAsync(req[property]);
    return next();
  } catch (error) {
    return next(new BadRequest(error.message));
  }
};

export default validation;
