import { ICreateMatch, IUpdateMatch } from '../interfaces/Match';
import { Matches, Teams } from '../database/models';

export default class MatchesService {
  public static async getAll() {
    const allMatches = await Matches.findAll({ include: [{
      model: Teams,
      as: 'teamHome',
      attributes: { exclude: ['id'] },
    }, {
      model: Teams,
      as: 'teamAway',
      attributes: { exclude: ['id'] },
    }],
    });

    return allMatches;
  }

  public static async matchesInProgress(inProgress: boolean) {
    const allMatches = await Matches.findAll({ where: { inProgress },
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });

    return allMatches;
  }

  public static async create(dataMatch: ICreateMatch) {
    const match = await Matches.create({
      homeTeam: dataMatch.homeTeam,
      awayTeam: dataMatch.awayTeam,
      homeTeamGoals: dataMatch.homeTeamGoals,
      awayTeamGoals: dataMatch.awayTeamGoals,
      inProgress: true,
    });

    return match;
  }

  public static async finish(id: number) {
    const inProgress = false;

    await Matches.update({ inProgress }, { where: { id } });

    return id;
  }

  public static async update({ id, homeTeamGoals, awayTeamGoals }: IUpdateMatch) {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return id;
  }
}
