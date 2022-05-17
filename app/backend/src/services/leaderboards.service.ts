// import Leaderboards from '../utils/leaderboards';
import { Matches, Teams } from '../database/models';
// import { ILeaderboardData } from '../interfaces/Leaderboard';
import homeTeamResultMatch from '../utils/homeTeamResults';
import awayTeamResultMatch from '../utils/awayTeamResults';
import getAllResults from '../utils/allResults';
import orderTable from '../utils/orderTable';

// interface IMatchScoreResult {
//   goalsFavor: number,
//   goalsOwn: number,
// }

// export interface ITeam {
//   id: number,
//   teamName: string,
// }

// export interface IMatch {
//   id: number,
//   homeTeam: number,
//   homeTeamGoals: number,
//   awayTeam: number,
//   awayTeamGoals: number,
//   inProgress: boolean,
// }

// const getAllEfficiency = (homeResult: ILeaderboardData, awayResult: ILeaderboardData) => {
//   const efficiency = (
//     ((homeResult.totalPoints + awayResult.totalPoints)
//     / ((homeResult.totalGames + awayResult.totalGames) * 3)) * 100
//   );

//   return Number(efficiency.toFixed(2));
// };

// const getAllResults = (homeResult: ILeaderboardData[], awayResult: ILeaderboardData[]) => {
//   const table: ILeaderboardData[] = [];

//   homeResult.forEach((homeTeam) => {
//     const [leaderboard] = awayResult
//       .filter((awayTeam) => awayTeam.name === homeTeam.name)
//       .map((team) => ({
//         name: team.name,
//         totalPoints: team.totalPoints + homeTeam.totalPoints,
//         totalGames: team.totalGames + homeTeam.totalGames,
//         totalVictories: team.totalVictories + homeTeam.totalVictories,
//         totalDraws: team.totalDraws + homeTeam.totalDraws,
//         totalLosses: team.totalLosses + homeTeam.totalLosses,
//         goalsFavor: team.goalsFavor + homeTeam.goalsFavor,
//         goalsOwn: team.goalsOwn + homeTeam.goalsOwn,
//         goalsBalance: team.goalsBalance + homeTeam.goalsBalance,
//         efficiency: getAllEfficiency(team, homeTeam) }));

//     table.push(leaderboard);
//   });

//   return table;
// };

// const objectTeamStats = (teamName: string, teamMatches: IMatchScoreResult[]) => ({
//   name: teamName,
//   totalPoints: Leaderboards.getTotalPoints(teamMatches),
//   totalGames: teamMatches.length,
//   totalVictories: Leaderboards.getTotalVictories(teamMatches),
//   totalDraws: Leaderboards.getTotalDraws(teamMatches),
//   totalLosses: Leaderboards.getTotalLosses(teamMatches),
//   goalsFavor: Leaderboards.getTotalGoalsFavor(teamMatches),
//   goalsOwn: Leaderboards.getTotalGoalsOwn(teamMatches),
//   goalsBalance: Leaderboards
//     .getTotalGoalsFavor(teamMatches) - Leaderboards.getTotalGoalsOwn(teamMatches),
//   efficiency: Leaderboards
//     .getEfficiency(teamMatches.length, Leaderboards.getTotalPoints(teamMatches)),
// });

// const orderTable = (table: ILeaderboardData[]) => {
//   const sortByGoalsOwn = table.sort((a, b) => a.goalsOwn - b.goalsOwn);
//   const sortByGoalsFavor = sortByGoalsOwn.sort((a, b) => b.goalsFavor - a.goalsFavor);
//   const sortByBalance = sortByGoalsFavor.sort((a, b) => b.goalsBalance - a.goalsBalance);
//   const sortByVictory = sortByBalance.sort((a, b) => b.totalVictories - a.totalVictories);
//   const sortByPoints = sortByVictory.sort((a, b) => b.totalPoints - a.totalPoints);
//   return sortByPoints;
// };

// const homeTeamResultMatch = (allTeams: ITeam[], allMatches: IMatch[]) => {
//   const table: ILeaderboardData[] = [];

//   allTeams.forEach((team) => {
//     const homeTeamResults = allMatches
//       .filter((teamMatches) => teamMatches.homeTeam === team.id)
//       .map((match) => ({
//         goalsFavor: match.homeTeamGoals,
//         goalsOwn: match.awayTeamGoals,
//       }));

//     const teamObject = objectTeamStats(team.teamName, homeTeamResults);

//     table.push(teamObject);
//   });

//   const result = orderTable(table);

//   return result;
// };

// const awayTeamResultMatch = (allTeams: ITeam[], allMatches: IMatch[]) => {
//   const table: ILeaderboardData[] = [];

//   allTeams.forEach((team) => {
//     const awayTeamResults = allMatches
//       .filter((teamMatches) => teamMatches.awayTeam === team.id)
//       .map((match) => ({
//         goalsFavor: match.awayTeamGoals,
//         goalsOwn: match.homeTeamGoals,
//       }));

//     const teamObject = objectTeamStats(team.teamName, awayTeamResults);

//     table.push(teamObject);
//   });

//   const result = orderTable(table);

//   return result;
// };

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
