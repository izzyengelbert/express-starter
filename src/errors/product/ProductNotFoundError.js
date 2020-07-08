import createError from 'http-errors';

const { NotFound } = createError;

export default class ProductNotFoundError extends NotFound {
  constructor() {
    super('Product not found!');
  }
}
