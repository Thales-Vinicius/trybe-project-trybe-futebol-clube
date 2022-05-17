export interface IMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchScoreResult {
  goalsFavor: number,
  goalsOwn: number,
}

export interface ICreateMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IUpdateMatch {
  id: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
