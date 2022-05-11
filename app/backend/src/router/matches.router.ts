import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matches = Router();

matches.get(
  '/',
  MatchesController.getAll,
);

export default matches;
