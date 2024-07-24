import { HorarioTrabajoRepository } from '../repositories/horario_trabajo_repository';
import { HorarioTrabajo } from '../models/horario_trabajo';
import { DateUtils } from '../../shared/utils/DateUtils';

export class HorarioTrabajoService {
  public static async getAllHorariosTrabajo(): Promise<HorarioTrabajo[]> {
    try {
      return await HorarioTrabajoRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener horarios de trabajo: ${error.message}`);
    }
  }

  public static async getHorarioTrabajoById(horarioTrabajoId: number): Promise<HorarioTrabajo | null> {
    try {
      return await HorarioTrabajoRepository.findById(horarioTrabajoId);
    } catch (error: any) {
      throw new Error(`Error al encontrar horario de trabajo: ${error.message}`);
    }
  }

  public static async addHorarioTrabajo(horarioTrabajo: HorarioTrabajo) {
    try {
      horarioTrabajo.created_at = DateUtils.formatDate(new Date());
      horarioTrabajo.updated_at = DateUtils.formatDate(new Date());
      return await HorarioTrabajoRepository.createHorarioTrabajo(horarioTrabajo);
    } catch (error: any) {
      throw new Error(`Error al crear horario de trabajo: ${error.message}`);
    }
  }

  public static async modifyHorarioTrabajo(horarioTrabajoId: number, horarioTrabajoData: HorarioTrabajo) {
    try {
      const horarioTrabajoFinded = await HorarioTrabajoRepository.findById(horarioTrabajoId);

      if (horarioTrabajoFinded) {
        if (horarioTrabajoData.work_date) {
          horarioTrabajoFinded.work_date = horarioTrabajoData.work_date;
        }
        if (horarioTrabajoData.start_time) {
          horarioTrabajoFinded.start_time = horarioTrabajoData.start_time;
        }
        if (horarioTrabajoData.end_time) {
          horarioTrabajoFinded.end_time = horarioTrabajoData.end_time;
        }
        if (horarioTrabajoData.deleted) {
          horarioTrabajoFinded.deleted = horarioTrabajoData.deleted;
        }
      } else {
        return null;
      }
      horarioTrabajoFinded.updated_by = horarioTrabajoData.updated_by;
      horarioTrabajoFinded.updated_at = DateUtils.formatDate(new Date());
      return await HorarioTrabajoRepository.updateHorarioTrabajo(horarioTrabajoId, horarioTrabajoFinded);
    } catch (error: any) {
      throw new Error(`Error al modificar horario de trabajo: ${error.message}`);
    }
  }

  public static async deleteHorarioTrabajo(horarioTrabajoId: number): Promise<boolean> {
    try {
      return await HorarioTrabajoRepository.deleteHorarioTrabajo(horarioTrabajoId);
    } catch (error: any) {
      throw new Error(`Error al eliminar horario de trabajo: ${error.message}`);
    }
  }
}
