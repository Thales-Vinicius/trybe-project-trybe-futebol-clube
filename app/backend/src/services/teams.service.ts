import { Teams } from '../database/models';

export default class TeamsService {
  public static async getAll() {
    const allTeams = await Teams.findAll();

    return allTeams;
  }
}
