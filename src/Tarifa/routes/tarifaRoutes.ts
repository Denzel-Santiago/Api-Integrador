import { Router } from 'express';
import { getTarifas, getTarifaById, createTarifa, updateTarifa, deleteTarifa } from '../controllers/tarifaController';
import { authMiddleware } from '../../shared/middlewares/auth';

const tarifaRoutes: Router = Router();

tarifaRoutes.get('/', getTarifas);
tarifaRoutes.get('/:tarifa_id', authMiddleware, getTarifaById);
tarifaRoutes.post('/', createTarifa);
tarifaRoutes.put('/:tarifa_id', updateTarifa);
tarifaRoutes.delete('/:tarifa_id', deleteTarifa);

export default tarifaRoutes;
