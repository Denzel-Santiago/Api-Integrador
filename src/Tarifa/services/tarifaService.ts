import { TarifaRepository } from '../repositories/tarifaRepository';
import { Tarifa } from '../models/tarifa';
import { DateUtils } from '../../shared/utils/DateUtils';

export class TarifaService {
  public static async getAllTarifas(): Promise<Tarifa[]> {
    try {
      return await TarifaRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener tarifas: ${error.message}`);
    }
  }

  public static async getTarifaById(tarifaId: number): Promise<Tarifa | null> {
    try {
      return await TarifaRepository.findById(tarifaId);
    } catch (error: any) {
      throw new Error(`Error al encontrar tarifa: ${error.message}`);
    }
  }

  public static async addTarifa(tarifa: Tarifa) {
    try {
      tarifa.created_at = DateUtils.formatDate(new Date());
      tarifa.updated_at = DateUtils.formatDate(new Date());
      return await TarifaRepository.createTarifa(tarifa);
    } catch (error: any) {
      throw new Error(`Error al crear tarifa: ${error.message}`);
    }
  }

  public static async modifyTarifa(tarifaId: number, tarifaData: Tarifa) {
    try {
      const tarifaFinded = await TarifaRepository.findById(tarifaId);

      if (tarifaFinded) {
        if (tarifaData.fare_amount) {
          tarifaFinded.fare_amount = tarifaData.fare_amount;
        }
        if (tarifaData.effective_date) {
          tarifaFinded.effective_date = tarifaData.effective_date;
        }
        if (tarifaData.deleted) {
          tarifaFinded.deleted = tarifaData.deleted;
        }
      } else {
        return null;
      }
      tarifaFinded.updated_by = tarifaData.updated_by;
      tarifaFinded.updated_at = DateUtils.formatDate(new Date());
      return await TarifaRepository.updateTarifa(tarifaId, tarifaFinded);
    } catch (error: any) {
      throw new Error(`Error al modificar tarifa: ${error.message}`);
    }
  }

  public static async deleteTarifa(tarifaId: number): Promise<boolean> {
    try {
      return await TarifaRepository.deleteTarifa(tarifaId);
    } catch (error: any) {
      throw new Error(`Error al eliminar tarifa: ${error.message}`);
    }
  }
}
