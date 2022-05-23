import { Router } from 'express';
// import tokenValidate from '../middlewares/token.middleware';
import MatchesController from '../controllers/matches.controller';
import matchValidate from '../middlewares/matches.middlewares';

const matches = Router();

matches.get(
  '/',
  MatchesController.getAll,
);

matches.post(
  '/',
  // tokenValidate,
  matchValidate,
  MatchesController.create,
);

matches.patch(
  '/:id/finish',
  MatchesController.finish,
);

matches.patch(
  '/:id',
  MatchesController.update,
);

export default matches;
