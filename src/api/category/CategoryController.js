import express from 'express';
import HttpStatus from 'http-status-codes';
import handleError from '../../middlewares/handleError';
import validation from '../../middlewares/validation';
import categorySchema from './schema/categorySchema';
// import authenticate from '../../middlewares/authenticate';

export default class CategoryController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._service = this._app.locals.services.categoryService;
    this._getCategories = this._getCategories.bind(this);
    this._getCategoryByParamId = this._getCategoryByParamId.bind(this);
    this._updateCategoryByParamId = this._updateCategoryByParamId.bind(this);
    this._updateCategoryByAbbreviation = this._updateCategoryByAbbreviation.bind(this);
    this._createCategory = this._createCategory.bind(this);
    this._deleteCategoryByParamId = this._deleteCategoryByParamId.bind(this);
    this._deleteCategoryByQuery = this._deleteCategoryByQuery.bind(this);
  }

  // eslint-disable-next-line max-lines-per-function
  registerRoutes() {
    this._app.use('/categories', this._router);
    this._router.get('/',
      validation(categorySchema.query, 'query'),
      handleError(this._getCategories));
    this._router.get(
      '/:id',
      validation(categorySchema.params, 'params'),
      handleError(this._getCategoryByParamId)
    );
    this._router.delete(
      '/:id',
      validation(categorySchema.params, 'params'),
      // validation(categorySchema.deleteQuery, 'query'),
      handleError(this._deleteCategoryByParamId)
    );
    this._router.delete(
      '/',
      validation(categorySchema.deleteByQuery, 'query'),
      // validation(categorySchema.deleteQuery, 'query'),
      handleError(this._deleteCategoryByQuery)
    );
    this._router.put(
      '/:id',
      validation(categorySchema.params, 'params'),
      validation(categorySchema.update, 'body'),
      handleError(this._updateCategoryByParamId)
    );
    this._router.put(
      '/',
      validation(categorySchema.updateByAbbreviation, 'query'),
      validation(categorySchema.update, 'body'),
      handleError(this._updateCategoryByAbbreviation)
    );
    this._router.post(
      '/',
      validation(categorySchema.create, 'body'),
      handleError(this._createCategory)
    );
  }

  async _getCategories(req, res) {
    if (Object.keys(req.query).length > 0) {
      const category = await this._service.getCategoriesByQuery(req.query);
      return res.status(HttpStatus.OK).json(category);
    }
    const categories = await this._service.getAllCategories();
    return res.status(HttpStatus.OK).json(categories);
  }

  async _getCategoryByParamId(req, res) {
    const category = await this._service.getCategoryById(req.params.id);

    return res.status(HttpStatus.OK).json(category);
  }

  async _updateCategoryByParamId(req, res) {
    const category = await this._service.updateCategoryById(req.params.id, req.body);

    return res.status(HttpStatus.ACCEPTED).json(category);
  }

  async _updateCategoryByAbbreviation(req, res) {
    const category = await this._service
      .updateCategoryByAbbreviation(req.query.abbreviation, req.body);

    return res.status(HttpStatus.ACCEPTED).json(category);
  }

  async _createCategory(req, res) {
    const category = await this._service.createCategory(req.body);

    return res.status(HttpStatus.CREATED).json(category);
  }

  async _deleteCategoryByParamId(req, res) {
    const category = await this._service.deleteCategoryById(req.params.id, req.query);

    return res.status(HttpStatus.ACCEPTED).json(category);
  }

  async _deleteCategoryByQuery(req, res) {
    const category = await this._service.deleteCategoryByQuery(req.query);

    return res.status(HttpStatus.ACCEPTED).json(category);
  }
}
