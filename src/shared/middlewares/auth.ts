import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserRepository } from '../../User/repositories/UserRepository';
import { UserPayLoad } from '../config/types/UserPayLoad';
import { AuthRequest } from '../config/types/authRequest';

dotenv.config();

const secretKey = process.env.SECRET || "";

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, secretKey) as UserPayLoad;
    const conductor = await UserRepository.findById(payload.role_id);

    if (!conductor) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.UserData = payload;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
