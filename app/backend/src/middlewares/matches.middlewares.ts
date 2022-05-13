import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teams.service';

const matchValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const allTeams = await TeamsService.getAll();

  const teamHome = allTeams.some((t) => t.id === homeTeam);
  const teamAway = allTeams.some((t) => t.id === awayTeam);

  if (!teamHome || !teamAway) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default matchValidate;
