import * as bcrypt from 'bcryptjs';
import { Users } from '../database/models';

export default class Login {
  public static async getLogin(email: string, password: string) {
    const user = await Users.findOne({ where: { email } });

    if (!user) return null;

    const validatePassword = await (!bcrypt.compare(password, user.password));

    if (!validatePassword) return null;

    const { id, username, role } = user;

    const userData = { id, username, email, role };

    return userData;
  }
}
