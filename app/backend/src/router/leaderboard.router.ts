import { Router } from 'express';
import LeaderboardsController from '../controllers/leaderboard.controller';

const leaderboard = Router();

leaderboard.get(
  '/home',
  LeaderboardsController.getForHome,
);

leaderboard.get(
  '/away',
  LeaderboardsController.getForAway,
);

leaderboard.get(
  '/',
  LeaderboardsController.getAll,
);

export default leaderboard;
