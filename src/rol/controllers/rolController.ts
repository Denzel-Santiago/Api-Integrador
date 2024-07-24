import { Request, Response } from 'express';
import { RolService } from '../services/rolService';

export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await RolService.getAllRoles();
    if (roles) {
      res.status(201).json(roles);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRolById = async (req: Request, res: Response) => {
  try {
    const rol = await RolService.getRolById(parseInt(req.params.rol_id, 10));
    if (rol) {
      res.status(201).json(rol);
    } else {
      res.status(404).json({ message: 'No se encontró el usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRol = async (req: Request, res: Response) => {
  try {
    const newRol = await RolService.addRol(req.body);
    if (newRol) {
      res.status(201).json(newRol);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRol = async (req: Request, res: Response) => {
  try {
    const updatedRol = await RolService.modifyRol(parseInt(req.params.rol_id, 10), req.body);
    if (updatedRol) {
      res.status(201).json(updatedRol);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRol = async (req: Request, res: Response) => {
  try {
    const deleted = await RolService.deleteRol(parseInt(req.params.rol_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el rol.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
