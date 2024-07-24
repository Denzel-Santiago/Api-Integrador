import { Request, Response } from 'express';
import { TarifaService } from '../services/tarifaService';

export const getTarifas = async (_req: Request, res: Response) => {
  try {
    const tarifas = await TarifaService.getAllTarifas();
    if (tarifas) {
      res.status(201).json(tarifas);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTarifaById = async (req: Request, res: Response) => {
  try {
    const tarifa = await TarifaService.getTarifaById(parseInt(req.params.tarifa_id, 10));
    if (tarifa) {
      res.status(201).json(tarifa);
    } else {
      res.status(404).json({ message: 'No se encontró la tarifa' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTarifa = async (req: Request, res: Response) => {
  try {
    const newTarifa = await TarifaService.addTarifa(req.body);
    if (newTarifa) {
      res.status(201).json(newTarifa);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTarifa = async (req: Request, res: Response) => {
  try {
    const updatedTarifa = await TarifaService.modifyTarifa(parseInt(req.params.tarifa_id, 10), req.body);
    if (updatedTarifa) {
      res.status(201).json(updatedTarifa);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTarifa = async (req: Request, res: Response) => {
  try {
    const deleted = await TarifaService.deleteTarifa(parseInt(req.params.tarifa_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó la tarifa.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
