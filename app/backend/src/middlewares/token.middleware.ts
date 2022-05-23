import { Request, Response, NextFunction } from 'express';
import * as jwt from '../utils/jwtGenerator';

const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found or invalid' });

  const decodedToken = await jwt.decryptToken(token);

  req.body.tokenData = decodedToken;

  next();
};

export default tokenValidate;
