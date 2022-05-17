interface IMatchScoreResult {
  goalsFavor: number,
  goalsOwn: number,
}

export default class Leaderboards {
  public static getTotalPoints(matches: IMatchScoreResult[]): number {
    return matches.reduce((points, { goalsFavor, goalsOwn }) => {
      if (goalsFavor > goalsOwn) return points + 3;
      if (goalsFavor === goalsOwn) return points + 1;

      return points;
    }, 0);
  }

  public static getTotalVictories(matches: IMatchScoreResult[]): number {
    return matches.reduce((victories, { goalsFavor, goalsOwn }) => {
      if (goalsFavor > goalsOwn) return victories + 1;

      return victories;
    }, 0);
  }

  public static getTotalDraws(matches: IMatchScoreResult[]): number {
    return matches.reduce((draws, { goalsFavor, goalsOwn }) => {
      if (goalsFavor === goalsOwn) return draws + 1;

      return draws;
    }, 0);
  }

  public static getTotalLosses(matches: IMatchScoreResult[]): number {
    return matches.reduce((losses, { goalsFavor, goalsOwn }) => {
      if (goalsFavor < goalsOwn) return losses + 1;

      return losses;
    }, 0);
  }

  public static getTotalGoalsFavor(matches: IMatchScoreResult[]): number {
    return matches.reduce((goals, { goalsFavor }) => goals + goalsFavor, 0);
  }

  public static getTotalGoalsOwn(matches: IMatchScoreResult[]): number {
    return matches.reduce((goals, { goalsOwn }) => goals + goalsOwn, 0);
  }

  public static getEfficiency(matches: number, points: number): number {
    const efficiency = (points / (matches * 3)) * 100;

    return Number(efficiency.toFixed(2));
  }
}
