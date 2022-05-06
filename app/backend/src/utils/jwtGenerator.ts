import { sign, verify } from 'jsonwebtoken';
import { readFile } from 'fs/promises';

interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
}

const jwtConfig = {
  expiresIn: '1d',
};

const encryptToken = async (data: IUser) => {
  const SECRET = await readFile('jwt.evaluation.key', 'utf-8');
  const createdToken = sign(data, SECRET, jwtConfig);
  return createdToken;
};

const decryptToken = async (token: string) => {
  const SECRET = await readFile('jwt.evaluation.key', 'utf-8');
  const verifyToken = verify(token, SECRET);
  return verifyToken as IUser;
};

export {
  encryptToken,
  decryptToken,
};
