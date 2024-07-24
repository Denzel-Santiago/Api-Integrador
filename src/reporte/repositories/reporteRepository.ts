import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Reporte } from '../models/reporte';

export class ReporteRepository {
  public static async findAll(): Promise<Reporte[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM reporte', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const reportes: Reporte[] = results as Reporte[];
          resolve(reportes);
        }
      });
    });
  }

  public static async findById(reporte_id: number): Promise<Reporte | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM reporte WHERE reporte_id = ?', [reporte_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const reportes: Reporte[] = results as Reporte[];
          if (reportes.length > 0) {
            resolve(reportes[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createReporte(reporte: Reporte): Promise<Reporte> {
    const query = 'INSERT INTO reporte (report_date, descripcion, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [reporte.report_date, reporte.descripcion, reporte.created_at, reporte.created_by, reporte.updated_at, reporte.updated_by, reporte.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdReporteId = result.insertId;
          const createdReporte: Reporte = { ...reporte, reporte_id: createdReporteId };
          resolve(createdReporte);
        }
      });
    });
  }

  public static async updateReporte(reporte_id: number, reporteData: Reporte): Promise<Reporte | null> {
    const query = 'UPDATE reporte SET report_date = ?, descripcion = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE reporte_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [reporteData.report_date, reporteData.descripcion, reporteData.updated_at, reporteData.updated_by, reporteData.deleted, reporte_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedReporte: Reporte = { ...reporteData, reporte_id };
            resolve(updatedReporte);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteReporte(reporte_id: number): Promise<boolean> {
    const query = 'DELETE FROM reporte WHERE reporte_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [reporte_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el reporte a eliminar
          }
        }
      });
    });
  }
}
