import { Router } from 'express';
import { getReportes, getReporteById, createReporte, updateReporte, deleteReporte } from '../controllers/reporteController';
import { authMiddleware } from '../../shared/middlewares/auth';

const reporteRoutes: Router = Router();

reporteRoutes.get('/', getReportes);
reporteRoutes.get('/:reporte_id', authMiddleware, getReporteById);
reporteRoutes.post('/', createReporte);
reporteRoutes.put('/:reporte_id', updateReporte);
reporteRoutes.delete('/:reporte_id', deleteReporte);

export default reporteRoutes;
