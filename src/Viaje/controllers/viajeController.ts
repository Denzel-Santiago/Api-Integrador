import { Request, Response } from 'express';
import { ViajeService } from '../services/viajeService';

export const getViajes = async (_req: Request, res: Response) => {
  try {
    const viajes = await ViajeService.getAllViajes();
    if (viajes) {
      res.status(201).json(viajes);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getViajeById = async (req: Request, res: Response) => {
  try {
    const viaje = await ViajeService.getViajeById(parseInt(req.params.viaje_id, 10));
    if (viaje) {
      res.status(201).json(viaje);
    } else {
      res.status(404).json({ message: 'No se encontró el viaje' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createViaje = async (req: Request, res: Response) => {
  try {
    const newViaje = await ViajeService.addViaje(req.body);
    if (newViaje) {
      res.status(201).json(newViaje);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateViaje = async (req: Request, res: Response) => {
  try {
    const updatedViaje = await ViajeService.modifyViaje(parseInt(req.params.viaje_id, 10), req.body);
    if (updatedViaje) {
      res.status(201).json(updatedViaje);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteViaje = async (req: Request, res: Response) => {
  try {
    const deleted = await ViajeService.deleteViaje(parseInt(req.params.viaje_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el viaje.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
