import { Request, Response } from 'express';
import { UserService } from '../services/usersService';
import jwt from 'jsonwebtoken';
import { UserPayLoad } from '../../shared/config/types/UserPayLoad';

const secretKey = process.env.SECRET || "";

export const loginUser = async (req: Request, res: Response) => {
  const { full_name, password } = req.body;
  try {
    const token = await UserService.login(full_name, password);

    if (!token) {
      return res.status(401).json({ message: 'Invalid full name or password' });
    }

    const user = jwt.verify(token, secretKey) as UserPayLoad;
    res.setHeader('Authorization', token);
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');

    return res.status(200).json({ token, user });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    if (users) {
      res.status(201).json(users);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(parseInt(req.params.user_id, 10));
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({ message: 'No se encontró el usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.addUser(req.body);
    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserService.modifyUser(parseInt(req.params.user_id, 10), req.body);
    if (updatedUser) {
      res.status(201).json(updatedUser);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await UserService.deleteUser(parseInt(req.params.user_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el usuario.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
