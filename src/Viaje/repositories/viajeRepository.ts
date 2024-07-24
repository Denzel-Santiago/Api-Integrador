import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Viaje } from '../models/viaje';

export class ViajeRepository {
  public static async findAll(): Promise<Viaje[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM viaje', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const viajes: Viaje[] = results as Viaje[];
          resolve(viajes);
        }
      });
    });
  }

  public static async findById(viaje_id: number): Promise<Viaje | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM viaje WHERE viaje_id = ?', [viaje_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const viajes: Viaje[] = results as Viaje[];
          if (viajes.length > 0) {
            resolve(viajes[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createViaje(viaje: Viaje): Promise<Viaje> {
    const query = 'INSERT INTO viaje (trip_date, start_time, end_time, fare, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [viaje.trip_date, viaje.start_time, viaje.end_time, viaje.fare, viaje.created_at, viaje.created_by, viaje.updated_at, viaje.updated_by, viaje.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdViajeId = result.insertId;
          const createdViaje: Viaje = { ...viaje, viaje_id: createdViajeId };
          resolve(createdViaje);
        }
      });
    });
  }

  public static async updateViaje(viaje_id: number, viajeData: Viaje): Promise<Viaje | null> {
    const query = 'UPDATE viaje SET trip_date = ?, start_time = ?, end_time = ?, fare = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE viaje_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [viajeData.trip_date, viajeData.start_time, viajeData.end_time, viajeData.fare, viajeData.updated_at, viajeData.updated_by, viajeData.deleted, viaje_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedViaje: Viaje = { ...viajeData, viaje_id };
            resolve(updatedViaje);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteViaje(viaje_id: number): Promise<boolean> {
    const query = 'DELETE FROM viaje WHERE viaje_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [viaje_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el viaje a eliminar
          }
        }
      });
    });
  }
}
