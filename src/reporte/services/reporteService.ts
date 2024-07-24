import { ReporteRepository } from '../repositories/reporteRepository';
import { Reporte } from '../models/reporte';
import { DateUtils } from '../../shared/utils/DateUtils';

export class ReporteService {
  public static async getAllReportes(): Promise<Reporte[]> {
    try {
      return await ReporteRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener reportes: ${error.message}`);
    }
  }

  public static async getReporteById(reporteId: number): Promise<Reporte | null> {
    try {
      return await ReporteRepository.findById(reporteId);
    } catch (error: any) {
      throw new Error(`Error al encontrar reporte: ${error.message}`);
    }
  }

  public static async addReporte(reporte: Reporte) {
    try {
      reporte.created_at = DateUtils.formatDate(new Date());
      reporte.updated_at = DateUtils.formatDate(new Date());
      return await ReporteRepository.createReporte(reporte);
    } catch (error: any) {
      throw new Error(`Error al crear reporte: ${error.message}`);
    }
  }

  public static async modifyReporte(reporteId: number, reporteData: Reporte) {
    try {
      const reporteFinded = await ReporteRepository.findById(reporteId);

      if (reporteFinded) {
        if (reporteData.report_date) {
          reporteFinded.report_date = reporteData.report_date;
        }
        if (reporteData.descripcion) {
          reporteFinded.descripcion = reporteData.descripcion;
        }
        if (reporteData.deleted) {
          reporteFinded.deleted = reporteData.deleted;
        }
      } else {
        return null;
      }
      reporteFinded.updated_by = reporteData.updated_by;
      reporteFinded.updated_at = DateUtils.formatDate(new Date());
      return await ReporteRepository.updateReporte(reporteId, reporteFinded);
    } catch (error: any) {
      throw new Error(`Error al modificar reporte: ${error.message}`);
    }
  }

  public static async deleteReporte(reporteId: number): Promise<boolean> {
    try {
      return await ReporteRepository.deleteReporte(reporteId);
    } catch (error: any) {
      throw new Error(`Error al eliminar reporte: ${error.message}`);
    }
  }
}
