import { IMatchScoreResult } from '../interfaces/Match';
import Leaderboards from './leaderboards';

const objectTeamStats = (teamName: string, teamMatches: IMatchScoreResult[]) => ({
  name: teamName,
  totalPoints: Leaderboards.getTotalPoints(teamMatches),
  totalGames: teamMatches.length,
  totalVictories: Leaderboards.getTotalVictories(teamMatches),
  totalDraws: Leaderboards.getTotalDraws(teamMatches),
  totalLosses: Leaderboards.getTotalLosses(teamMatches),
  goalsFavor: Leaderboards.getTotalGoalsFavor(teamMatches),
  goalsOwn: Leaderboards.getTotalGoalsOwn(teamMatches),
  goalsBalance: Leaderboards
    .getTotalGoalsFavor(teamMatches) - Leaderboards.getTotalGoalsOwn(teamMatches),
  efficiency: Leaderboards
    .getEfficiency(teamMatches.length, Leaderboards.getTotalPoints(teamMatches)),
});

export default objectTeamStats;
