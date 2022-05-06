import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import { emailValidation, passwordValidation } from '../middlewares/login.middlewares';

const login = Router();

login.post(
  '/',
  emailValidation,
  passwordValidation,
  LoginController.create,
);

login.get(
  '/validate',
  LoginController.validate,
);

export default login;
