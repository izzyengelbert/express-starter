import express from 'express';
import HttpStatus from 'http-status-codes';
import handleError from '../../middlewares/handleError';
import validation from '../../middlewares/validation';
import productSchema from './schema/productSchema';
// import authenticate from '../../middlewares/authenticate';

export default class ProductController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._service = this._app.locals.services.productService;
    this._getProducts = this._getProducts.bind(this);
    this._getProductById = this._getProductById.bind(this);
    this._deleteProductById = this._deleteProductById.bind(this);
    this._updateProductById = this._updateProductById.bind(this);
    this._createProduct = this._createProduct.bind(this);
  }

  // eslint-disable-next-line max-lines-per-function
  registerRoutes() {
    this._app.use('/products', this._router);
    this._router.get('/',
      // authenticate,
      validation(productSchema.query, 'query'),
      handleError(this._getProducts));
    this._router.get(
      '/:id',
      validation(productSchema.params, 'params'),
      handleError(this._getProductById)
    );
    this._router.delete(
      '/:id',
      validation(productSchema.params, 'params'),
      handleError(this._deleteProductById)
    );
    this._router.put(
      '/:id',
      validation(productSchema.params, 'params'),
      validation(productSchema.update, 'body'),
      handleError(this._updateProductById)
    );
    this._router.post(
      '/',
      validation(productSchema.create, 'body'),
      handleError(this._createProduct)
    );
  }

  async _getProducts(req, res) {
    const { description, ...query } = req.query;
    if (description) {
      const product = await this._service.getProductByDescription(description);
      return res.status(HttpStatus.OK).json(product);
    }
    const products = await this._service.getAllProducts(query);
    return res.status(HttpStatus.OK).json(products);
  }

  async _getProductById(req, res) {
    const product = await this._service.getProductById(req.params.id);

    return res.status(HttpStatus.OK).json(product);
  }

  async _deleteProductById(req, res) {
    const product = await this._service.deleteProductById(req.params.id);

    return res.status(HttpStatus.OK).json(product);
  }

  async _updateProductById(req, res) {
    const product = await this._service.updateProductById(req.params.id, req.body);

    return res.status(HttpStatus.NO_CONTENT).json(product);
  }

  async _createProduct(req, res) {
    const product = await this._service.createProduct(req.body);

    return res.status(HttpStatus.CREATED).json(product);
  }
}
