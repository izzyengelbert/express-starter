import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import database from './database';
import config from '../config/index';
import errorMiddleware from './middlewares/errorMiddleware';

import User from './api/user/User';
import AuthController from './api/auth/AuthController';

import UserController from './api/user/UserController';

import UserService from './api/user/UserService';
import AuthService from './api/auth/AuthService';

const app = express();
const db = database.connect(config.db);

app.use(cors);

const createModels = () => ({
  User: User.init(db);
});

const createServices = (models) => ({
  userService: new UserService(models),
  authService: new AuthService(models)
});

const createControllers = () => [
  new UserController(app),
  new AuthController(app)
];

const initializeAssociation = (models) => {
  models.User.associate(models);
};

const initializeController = () => {
  const controllers = createControllers();
  controllers.forEach((controller) => {
    controller.registerRoutes();
  });
};

const registerDependencies = () => {
  app.locals.models = createModels();
  app.locals.services = createServices(app.locals.models);
};

registerDependencies();

app.use(bodyParser.json());
initializeController();

initializeAssociation(app.locals.models);

app.use(errorMiddleware);

export default app;
