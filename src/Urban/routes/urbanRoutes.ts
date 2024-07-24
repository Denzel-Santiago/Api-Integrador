import { Router } from 'express';
import { getUrbans, getUrbanById, createUrban, updateUrban, deleteUrban } from '../controllers/urbanController';
import { authMiddleware } from '../../shared/middlewares/auth';

const urbanRoutes: Router = Router();

urbanRoutes.get('/', getUrbans);
urbanRoutes.get('/:urban_id', authMiddleware, getUrbanById);
urbanRoutes.post('/', createUrban);
urbanRoutes.put('/:urban_id', updateUrban);
urbanRoutes.delete('/:urban_id', deleteUrban);

export default urbanRoutes;
