import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teams = Router();

teams.get(
  '/',
  TeamsController.getAll,
);

export default teams;
