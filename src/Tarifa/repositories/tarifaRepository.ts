import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Tarifa } from '../models/tarifa';

export class TarifaRepository {
  public static async findAll(): Promise<Tarifa[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM tarifa', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const tarifas: Tarifa[] = results as Tarifa[];
          resolve(tarifas);
        }
      });
    });
  }

  public static async findById(tarifa_id: number): Promise<Tarifa | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM tarifa WHERE tarifa_id = ?', [tarifa_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const tarifas: Tarifa[] = results as Tarifa[];
          if (tarifas.length > 0) {
            resolve(tarifas[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createTarifa(tarifa: Tarifa): Promise<Tarifa> {
    const query = 'INSERT INTO tarifa (fare_amount, effective_date, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [tarifa.fare_amount, tarifa.effective_date, tarifa.created_at, tarifa.created_by, tarifa.updated_at, tarifa.updated_by, tarifa.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdTarifaId = result.insertId;
          const createdTarifa: Tarifa = { ...tarifa, tarifa_id: createdTarifaId };
          resolve(createdTarifa);
        }
      });
    });
  }

  public static async updateTarifa(tarifa_id: number, tarifaData: Tarifa): Promise<Tarifa | null> {
    const query = 'UPDATE tarifa SET fare_amount = ?, effective_date = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE tarifa_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [tarifaData.fare_amount, tarifaData.effective_date, tarifaData.updated_at, tarifaData.updated_by, tarifaData.deleted, tarifa_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedTarifa: Tarifa = { ...tarifaData, tarifa_id };
            resolve(updatedTarifa);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteTarifa(tarifa_id: number): Promise<boolean> {
    const query = 'DELETE FROM tarifa WHERE tarifa_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [tarifa_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró la tarifa a eliminar
          }
        }
      });
    });
  }
}
