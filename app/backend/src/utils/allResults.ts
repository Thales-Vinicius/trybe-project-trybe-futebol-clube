import { ILeaderboardData } from '../interfaces/Leaderboard';

const getAllEfficiency = (homeResult: ILeaderboardData, awayResult: ILeaderboardData) => {
  const efficiency = (
    ((homeResult.totalPoints + awayResult.totalPoints)
    / ((homeResult.totalGames + awayResult.totalGames) * 3)) * 100
  );

  return Number(efficiency.toFixed(2));
};

const getAllResults = (homeResult: ILeaderboardData[], awayResult: ILeaderboardData[]) => {
  const table: ILeaderboardData[] = [];

  homeResult.forEach((homeTeam) => {
    const [leaderboard] = awayResult
      .filter((awayTeam) => awayTeam.name === homeTeam.name)
      .map((team) => ({
        name: team.name,
        totalPoints: team.totalPoints + homeTeam.totalPoints,
        totalGames: team.totalGames + homeTeam.totalGames,
        totalVictories: team.totalVictories + homeTeam.totalVictories,
        totalDraws: team.totalDraws + homeTeam.totalDraws,
        totalLosses: team.totalLosses + homeTeam.totalLosses,
        goalsFavor: team.goalsFavor + homeTeam.goalsFavor,
        goalsOwn: team.goalsOwn + homeTeam.goalsOwn,
        goalsBalance: team.goalsBalance + homeTeam.goalsBalance,
        efficiency: getAllEfficiency(team, homeTeam) }));

    table.push(leaderboard);
  });

  return table;
};

export default getAllResults;
