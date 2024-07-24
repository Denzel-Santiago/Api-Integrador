import { Request, Response } from 'express';
import { ReporteService } from '../services/reporteService';

export const getReportes = async (_req: Request, res: Response) => {
  try {
    const reportes = await ReporteService.getAllReportes();
    if (reportes) {
      res.status(201).json(reportes);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getReporteById = async (req: Request, res: Response) => {
  try {
    const reporte = await ReporteService.getReporteById(parseInt(req.params.reporte_id, 10));
    if (reporte) {
      res.status(201).json(reporte);
    } else {
      res.status(404).json({ message: 'No se encontró el reporte' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createReporte = async (req: Request, res: Response) => {
  try {
    const newReporte = await ReporteService.addReporte(req.body);
    if (newReporte) {
      res.status(201).json(newReporte);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReporte = async (req: Request, res: Response) => {
  try {
    const updatedReporte = await ReporteService.modifyReporte(parseInt(req.params.reporte_id, 10), req.body);
    if (updatedReporte) {
      res.status(201).json(updatedReporte);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReporte = async (req: Request, res: Response) => {
  try {
    const deleted = await ReporteService.deleteReporte(parseInt(req.params.reporte_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el reporte.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
