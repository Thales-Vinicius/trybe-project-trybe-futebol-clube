import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      const matches = await MatchesService.getAll();

      return res.status(200).json(matches);
    }

    const param = (inProgress === 'true');

    const matches = await MatchesService.matchesInProgress(param);

    return res.status(200).json(matches);
  }

  public static async create(req: Request, res: Response) {
    const { body } = req;

    const match = await MatchesService.create(body);

    if (!match) return res.status(401).json({ message: 'Incorrect or invalid match' });

    return res.status(201).json(match);
  }

  public static async finish(req: Request, res: Response) {
    const { id } = req.params;

    const editMatch = await MatchesService.finish(Number(id));

    if (!editMatch) return res.status(401).json({ message: 'Match not found' });

    return res.status(200).json({ message: 'end game' });
  }
}
