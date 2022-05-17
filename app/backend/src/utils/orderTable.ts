import { ILeaderboardData } from '../interfaces/Leaderboard';

const orderTable = (table: ILeaderboardData[]) => {
  const sortByGoalsOwn = table.sort((a, b) => a.goalsOwn - b.goalsOwn);
  const sortByGoalsFavor = sortByGoalsOwn.sort((a, b) => b.goalsFavor - a.goalsFavor);
  const sortByBalance = sortByGoalsFavor.sort((a, b) => b.goalsBalance - a.goalsBalance);
  const sortByVictory = sortByBalance.sort((a, b) => b.totalVictories - a.totalVictories);
  const sortByPoints = sortByVictory.sort((a, b) => b.totalPoints - a.totalPoints);

  return sortByPoints;
};

export default orderTable;
