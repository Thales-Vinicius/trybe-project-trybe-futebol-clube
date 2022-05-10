import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  public static async getAll(_req: Request, res: Response) {
    const allTeams = await TeamsService.getAll();

    if (!allTeams) return res.status(401).json({ message: 'Not Found' });

    return res.status(200).json(allTeams);
  }
}
