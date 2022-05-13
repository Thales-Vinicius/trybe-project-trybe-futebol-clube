import * as bcrypt from 'bcryptjs';
import { Users } from '../database/models';

export default class Login {
  public static async getLogin(email: string, password: string) {
    const user = await Users.findOne({ where: { email } });

    if (!user) return null;

    const isValidatePassword = (bcrypt.compareSync(password, user.password));

    if (!isValidatePassword) return null;

    const userData = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    return userData;
  }
}
