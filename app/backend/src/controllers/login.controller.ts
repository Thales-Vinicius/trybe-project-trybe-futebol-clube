import { Request, Response } from 'express';
import Login from '../services/login.service';
import * as jwt from '../utils/jwtGenerator';

export default class LoginController {
  public static async getLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await Login.getLogin(email, password);

    if (!user) return res.status(401).json({ message: 'Incorrect email or password' });

    const token = await jwt.encryptToken(user);

    return res.status(200).json({ user, token });
  }

  public static async validate(req: Request, res: Response) {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Invalid token' });

    const tokenData = await jwt.decryptToken(token);

    return res.status(200).json(tokenData.role);
  }
}
