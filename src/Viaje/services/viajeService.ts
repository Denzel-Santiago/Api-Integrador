import { ViajeRepository } from '../repositories/viajeRepository';
import { Viaje } from '../models/viaje';
import { DateUtils } from '../../shared/utils/DateUtils';

export class ViajeService {
  public static async getAllViajes(): Promise<Viaje[]> {
    try {
      return await ViajeRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener viajes: ${error.message}`);
    }
  }

  public static async getViajeById(viajeId: number): Promise<Viaje | null> {
    try {
      return await ViajeRepository.findById(viajeId);
    } catch (error: any) {
      throw new Error(`Error al encontrar viaje: ${error.message}`);
    }
  }

  public static async addViaje(viaje: Viaje) {
    try {
      viaje.created_at = DateUtils.formatDate(new Date());
      viaje.updated_at = DateUtils.formatDate(new Date());
      return await ViajeRepository.createViaje(viaje);
    } catch (error: any) {
      throw new Error(`Error al crear viaje: ${error.message}`);
    }
  }

  public static async modifyViaje(viajeId: number, viajeData: Viaje) {
    try {
      const viajeFinded = await ViajeRepository.findById(viajeId);

      if (viajeFinded) {
        if (viajeData.trip_date) {
          viajeFinded.trip_date = viajeData.trip_date;
        }
        if (viajeData.start_time) {
          viajeFinded.start_time = viajeData.start_time;
        }
        if (viajeData.end_time) {
          viajeFinded.end_time = viajeData.end_time;
        }
        if (viajeData.fare) {
          viajeFinded.fare = viajeData.fare;
        }
        if (viajeData.deleted) {
          viajeFinded.deleted = viajeData.deleted;
        }
      } else {
        return null;
      }
      viajeFinded.updated_by = viajeData.updated_by;
      viajeFinded.updated_at = DateUtils.formatDate(new Date());
      return await ViajeRepository.updateViaje(viajeId, viajeFinded);
    } catch (error: any) {
      throw new Error(`Error al modificar viaje: ${error.message}`);
    }
  }

  public static async deleteViaje(viajeId: number): Promise<boolean> {
    try {
      return await ViajeRepository.deleteViaje(viajeId);
    } catch (error: any) {
      throw new Error(`Error al eliminar viaje: ${error.message}`);
    }
  }
}
