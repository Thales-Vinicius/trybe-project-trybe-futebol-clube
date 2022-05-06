import { Request, Response, NextFunction } from 'express';

const emailValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'All fields must be filled' });

  next();
};

const passwordValidation = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'All fields must be filled' });

  next();
};

export {
  emailValidation,
  passwordValidation,
};
