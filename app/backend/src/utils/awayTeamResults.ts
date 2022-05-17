import { ITeam } from '../interfaces/Team';
import { ILeaderboardData } from '../interfaces/Leaderboard';
import { IMatch } from '../interfaces/Match';
import objectTeamStats from './objectTeam';
import orderTable from './orderTable';

const awayTeamResultMatch = (allTeams: ITeam[], allMatches: IMatch[]) => {
  const table: ILeaderboardData[] = [];

  allTeams.forEach((team) => {
    const awayTeamResults = allMatches
      .filter((teamMatches) => teamMatches.awayTeam === team.id)
      .map((match) => ({
        goalsFavor: match.awayTeamGoals,
        goalsOwn: match.homeTeamGoals,
      }));

    const teamObject = objectTeamStats(team.teamName, awayTeamResults);

    table.push(teamObject);
  });

  const result = orderTable(table);

  return result;
};

export default awayTeamResultMatch;
