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
}
