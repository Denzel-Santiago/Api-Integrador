import { UrbanRepository } from '../repositories/urbanRepository';
import { Urban } from '../models/urban';
import { DateUtils } from '../../shared/utils/DateUtils';

export class UrbanService {
  public static async getAllUrbans(): Promise<Urban[]> {
    try {
      return await UrbanRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener urbans: ${error.message}`);
    }
  }

  public static async getUrbanById(urbanId: number): Promise<Urban | null> {
    try {
      return await UrbanRepository.findById(urbanId);
    } catch (error: any) {
      throw new Error(`Error al encontrar urban: ${error.message}`);
    }
  }

  public static async addUrban(urban: Urban) {
    try {
      urban.created_at = DateUtils.formatDate(new Date());
      urban.updated_at = DateUtils.formatDate(new Date());
      return await UrbanRepository.createUrban(urban);
    } catch (error: any) {
      throw new Error(`Error al crear urban: ${error.message}`);
    }
  }

  public static async modifyUrban(urbanId: number, urbanData: Urban) {
    try {
      const urbanFinded = await UrbanRepository.findById(urbanId);

      if (urbanFinded) {
        if (urbanData.vehicle_number) {
          urbanFinded.vehicle_number = urbanData.vehicle_number;
        }
        if (urbanData.status) {
          urbanFinded.status = urbanData.status;
        }
        if (urbanData.deleted) {
          urbanFinded.deleted = urbanData.deleted;
        }
      } else {
        return null;
      }
      urbanFinded.updated_by = urbanData.updated_by;
      urbanFinded.updated_at = DateUtils.formatDate(new Date());
      return await UrbanRepository.updateUrban(urbanId, urbanFinded);
    } catch (error: any) {
      throw new Error(`Error al modificar urban: ${error.message}`);
    }
  }

  public static async deleteUrban(urbanId: number): Promise<boolean> {
    try {
      return await UrbanRepository.deleteUrban(urbanId);
    } catch (error: any) {
      throw new Error(`Error al eliminar urban: ${error.message}`);
    }
  }
}
