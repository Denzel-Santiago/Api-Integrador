import { Request, Response } from 'express';
import { HorarioTrabajoService } from '../services/horario_trabajoService';

export const getHorariosTrabajo = async (_req: Request, res: Response) => {
  try {
    const horariosTrabajo = await HorarioTrabajoService.getAllHorariosTrabajo();
    if (horariosTrabajo) {
      res.status(201).json(horariosTrabajo);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
 

export const getHorarioTrabajoById = async (req: Request, res: Response) => {
  try {
    const horarioTrabajo = await HorarioTrabajoService.getHorarioTrabajoById(parseInt(req.params.horario_trabajo_id, 10));
    if (horarioTrabajo) {
      res.status(201).json(horarioTrabajo);
    } else {
      res.status(404).json({ message: 'No se encontró el horario de trabajo' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createHorarioTrabajo = async (req: Request, res: Response) => {
  try {
    const newHorarioTrabajo = await HorarioTrabajoService.addHorarioTrabajo(req.body);
    if (newHorarioTrabajo) {
      res.status(201).json(newHorarioTrabajo);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateHorarioTrabajo = async (req: Request, res: Response) => {
  try {
    const updatedHorarioTrabajo = await HorarioTrabajoService.modifyHorarioTrabajo(parseInt(req.params.horario_trabajo_id, 10), req.body);
    if (updatedHorarioTrabajo) {
      res.status(201).json(updatedHorarioTrabajo);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteHorarioTrabajo = async (req: Request, res: Response) => {
  try {
    const deleted = await HorarioTrabajoService.deleteHorarioTrabajo(parseInt(req.params.horario_trabajo_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el horario de trabajo.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
