import { Router } from 'express';
import { getRoles, getRolById, createRol, updateRol, deleteRol } from '../controllers/rolController';
import { authMiddleware } from '../../shared/middlewares/auth';

const rolRoutes: Router = Router();


rolRoutes.get('/', getRoles);
rolRoutes.get('/:rol_id', authMiddleware, getRolById);
rolRoutes.post('/', createRol);
rolRoutes.put('/:rol_id', updateRol);
rolRoutes.delete('/:rol_id', deleteRol);

export default rolRoutes;
