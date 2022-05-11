import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      const matches = await MatchesService.getAll();

      // if (!matches) return res.status(401).json({ message: 'Match not found' });

      return res.status(200).json(matches);
    }

    const param = (inProgress === 'true');

    const matches = await MatchesService.matchesInProgress(param);

    return res.status(200).json(matches);
  }
}
