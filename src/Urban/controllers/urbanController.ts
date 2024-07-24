import { Request, Response } from 'express';
import { UrbanService } from '../services/urbanService';

export const getUrbans = async (_req: Request, res: Response) => {
  try {
    const urbans = await UrbanService.getAllUrbans();
    if (urbans) {
      res.status(201).json(urbans);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUrbanById = async (req: Request, res: Response) => {
  try {
    const urban = await UrbanService.getUrbanById(parseInt(req.params.urban_id, 10));
    if (urban) {
      res.status(201).json(urban);
    } else {
      res.status(404).json({ message: 'No se encontró el urban' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUrban = async (req: Request, res: Response) => {
  try {
    const newUrban = await UrbanService.addUrban(req.body);
    if (newUrban) {
      res.status(201).json(newUrban);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUrban = async (req: Request, res: Response) => {
  try {
    const updatedUrban = await UrbanService.modifyUrban(parseInt(req.params.urban_id, 10), req.body);
    if (updatedUrban) {
      res.status(201).json(updatedUrban);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUrban = async (req: Request, res: Response) => {
  try {
    const deleted = await UrbanService.deleteUrban(parseInt(req.params.urban_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el urban.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
