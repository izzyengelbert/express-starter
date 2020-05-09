import express from 'express';
import handleError from '../../middlewares/handleError';

class AuthController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._service = this._app.locals.services.authService;
    this._authenticate = this._authenticate.bind(this);
  }

  registerRoutes() {
    this._app.use('/auth', this._router);
    this._router.post('/', handleError(this._authenticate));
  }

  async _authenticate(req, res) {
    const { username, password } = req.body;
    const response = await this._service.authenticateUser(username, password);
    return res.json(response);
  }
}

export default AuthController;
