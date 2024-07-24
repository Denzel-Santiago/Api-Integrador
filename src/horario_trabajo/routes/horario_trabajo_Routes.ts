import { Router } from 'express';
import { getHorariosTrabajo, getHorarioTrabajoById, createHorarioTrabajo, updateHorarioTrabajo, deleteHorarioTrabajo } from '../controllers/horario_trabajo_controller';
import { authMiddleware } from '../../shared/middlewares/auth';

const horarioTrabajoRoutes: Router = Router();

horarioTrabajoRoutes.get('/', getHorariosTrabajo);
horarioTrabajoRoutes.get('/:horario_trabajo_id', authMiddleware, getHorarioTrabajoById);
horarioTrabajoRoutes.post('/', createHorarioTrabajo);
horarioTrabajoRoutes.put('/:horario_trabajo_id', updateHorarioTrabajo);
horarioTrabajoRoutes.delete('/:horario_trabajo_id', deleteHorarioTrabajo);

export default horarioTrabajoRoutes;
