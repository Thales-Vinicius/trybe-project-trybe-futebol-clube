import { ITeam } from '../interfaces/Team';
import { ILeaderboardData } from '../interfaces/Leaderboard';
import { IMatch } from '../interfaces/Match';
import objectTeamStats from './objectTeam';
import orderTable from './orderTable';

const homeTeamResultMatch = (allTeams: ITeam[], allMatches: IMatch[]) => {
  const table: ILeaderboardData[] = [];

  allTeams.forEach((team) => {
    const homeTeamResults = allMatches
      .filter((teamMatches) => teamMatches.homeTeam === team.id)
      .map((match) => ({
        goalsFavor: match.homeTeamGoals,
        goalsOwn: match.awayTeamGoals,
      }));

    const teamObject = objectTeamStats(team.teamName, homeTeamResults);

    table.push(teamObject);
  });

  const result = orderTable(table);

  return result;
};

export default homeTeamResultMatch;
