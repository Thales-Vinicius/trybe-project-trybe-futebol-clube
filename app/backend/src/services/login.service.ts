import * as bcrypt from 'bcryptjs';
import { Users } from '../database/models';

export default class Login {
  public static async create(email: string, password: string) {
    const user = await Users.findOne({ where: { email } });

    if (!user) return null;

    if (!bcrypt.compareSync(password, user.password)) return null;

    const { id, username, role } = user;

    const userData = { id, username, email, role };

    return userData;
  }
}
