import express from 'express';
import HttpStatus from 'http-status-codes';
import handleError from '../../middlewares/handleError';
import validation from '../../middlewares/validation';
import userSchema from './schema/userSchema';
// import authenticate from '../../middlewares/authenticate';

export default class UserController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._service = this._app.locals.services.userService;
    this._getUsers = this._getUsers.bind(this);
    this._getUserById = this._getUserById.bind(this);
    this._createUser = this._createUser.bind(this);
  }

  registerRoutes() {
    this._app.use('/users', this._router);
    this._router.get('/', validation(userSchema.query, 'query'), handleError(this._getUsers));
    this._router.get('/:id', validation(userSchema.params, 'params'), handleError(this._getUserById));
    this._router.post('/', validation(userSchema.createUser, 'body'), handleError(this._createUser));
  }

  async _getUsers(req, res) {
    const { username } = req.query;
    if (username) {
      const user = await this._service.getUserByUsername(username);
      return res.status(HttpStatus.OK).json(user);
    }
    const users = await this._service.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  async _getUserById(req, res) {
    const user = await this._service.getUserById(req.params.id);

    const response = { status: HttpStatus.CREATED, test: 'test', user };
    return res.status(HttpStatus.OK).json(response);
  }

  async _createUser(req, res) {
    const user = await this._service.createUser(req.body);

    return res.status(HttpStatus.CREATED).json(user);
  }
}
