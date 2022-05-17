import { Request, Response } from 'express';
import LeaderboardsService from '../services/leaderboards.service';

export default class LeaderboardsController {
  public static async getForHome(_req: Request, res: Response) {
    const leaderboards = await LeaderboardsService.getHomeLeaderbords();

    return res.status(200).json(leaderboards);
  }

  public static async getForAway(_req: Request, res: Response) {
    const leaderboards = await LeaderboardsService.getAwayLeaderbords();

    return res.status(200).json(leaderboards);
  }

  public static async getAll(_req: Request, res: Response) {
    const leaderboards = await LeaderboardsService.getAllLeaderboards();

    return res.status(200).json(leaderboards);
  }
}
