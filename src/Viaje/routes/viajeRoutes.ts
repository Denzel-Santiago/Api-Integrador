import { Router } from 'express';
import { getViajes, getViajeById, createViaje, updateViaje, deleteViaje } from '../controllers/viajeController';
import { authMiddleware } from '../../shared/middlewares/auth';

const viajeRoutes: Router = Router();

viajeRoutes.get('/', getViajes);
viajeRoutes.get('/:viaje_id', authMiddleware, getViajeById);
viajeRoutes.post('/', createViaje);
viajeRoutes.put('/:viaje_id', updateViaje);
viajeRoutes.delete('/:viaje_id', deleteViaje);

export default viajeRoutes;
