import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teams = Router();

teams.get(
  '/',
  TeamsController.getAll,
);

teams.get(
  '/:id',
  TeamsController.getById,
);

export default teams;
