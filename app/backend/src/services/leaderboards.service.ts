import { Matches, Teams } from '../database/models';
import homeTeamResultMatch from '../utils/homeTeamResults';
import awayTeamResultMatch from '../utils/awayTeamResults';
import getAllResults from '../utils/allResults';
import orderTable from '../utils/orderTable';

export default class LeaderboardsService {
  public static async getHomeLeaderbords() {
    const allMatches = await Matches.findAll({ where: { inProgress: false } });
    const allTeams = await Teams.findAll();

    const resultHomeTeam = homeTeamResultMatch(allTeams, allMatches);

    return resultHomeTeam;
  }

  public static async getAwayLeaderbords() {
    const allMatches = await Matches.findAll({ where: { inProgress: false } });
    const allTeams = await Teams.findAll();

    const resultAwayTeam = awayTeamResultMatch(allTeams, allMatches);

    return resultAwayTeam;
  }

  public static async getAllLeaderboards() {
    const allMatches = await Matches.findAll({ where: { inProgress: false } });
    const allTeams = await Teams.findAll();

    const resultHomeTeam = homeTeamResultMatch(allTeams, allMatches);
    const resultAwayTeam = awayTeamResultMatch(allTeams, allMatches);

    const table = getAllResults(resultHomeTeam, resultAwayTeam);

    const result = orderTable(table);

    return result;
  }
}
