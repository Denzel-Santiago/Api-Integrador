import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Urban } from '../models/urban';

export class UrbanRepository {
  public static async findAll(): Promise<Urban[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM urban', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const urbans: Urban[] = results as Urban[];
          resolve(urbans);
        }
      });
    });
  }

  public static async findById(urban_id: number): Promise<Urban | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM urban WHERE urban_id = ?', [urban_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const urbans: Urban[] = results as Urban[];
          if (urbans.length > 0) {
            resolve(urbans[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createUrban(urban: Urban): Promise<Urban> {
    const query = 'INSERT INTO urban (vehicle_number, status, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [urban.vehicle_number, urban.status, urban.created_at, urban.created_by, urban.updated_at, urban.updated_by, urban.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUrbanId = result.insertId;
          const createdUrban: Urban = { ...urban, urban_id: createdUrbanId };
          resolve(createdUrban);
        }
      });
    });
  }

  public static async updateUrban(urban_id: number, urbanData: Urban): Promise<Urban | null> {
    const query = 'UPDATE urban SET vehicle_number = ?, status = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE urban_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [urbanData.vehicle_number, urbanData.status, urbanData.updated_at, urbanData.updated_by, urbanData.deleted, urban_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedUrban: Urban = { ...urbanData, urban_id };
            resolve(updatedUrban);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUrban(urban_id: number): Promise<boolean> {
    const query = 'DELETE FROM urban WHERE urban_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [urban_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el urban a eliminar
          }
        }
      });
    });
  }
}
