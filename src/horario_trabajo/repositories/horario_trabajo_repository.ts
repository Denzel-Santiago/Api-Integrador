import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { HorarioTrabajo } from '../models/horario_trabajo';

export class HorarioTrabajoRepository {
  public static async findAll(): Promise<HorarioTrabajo[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM horario_trabajo', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const horariosTrabajo: HorarioTrabajo[] = results as HorarioTrabajo[];
          resolve(horariosTrabajo);
        }
      });
    });
  }

  public static async findById(horario_trabajo_id: number): Promise<HorarioTrabajo | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM horario_trabajo WHERE horario_trabajo_id = ?', [horario_trabajo_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const horariosTrabajo: HorarioTrabajo[] = results as HorarioTrabajo[];
          if (horariosTrabajo.length > 0) {
            resolve(horariosTrabajo[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createHorarioTrabajo(horarioTrabajo: HorarioTrabajo): Promise<HorarioTrabajo> {
    const query = 'INSERT INTO horario_trabajo (work_date, start_time, end_time, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [horarioTrabajo.work_date, horarioTrabajo.start_time, horarioTrabajo.end_time, horarioTrabajo.created_at, horarioTrabajo.created_by, horarioTrabajo.updated_at, horarioTrabajo.updated_by, horarioTrabajo.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdHorarioTrabajoId = result.insertId;
          const createdHorarioTrabajo: HorarioTrabajo = { ...horarioTrabajo, horario_trabajo_id: createdHorarioTrabajoId };
          resolve(createdHorarioTrabajo);
        }
      });
    });
  }

  public static async updateHorarioTrabajo(horario_trabajo_id: number, horarioTrabajoData: HorarioTrabajo): Promise<HorarioTrabajo | null> {
    const query = 'UPDATE horario_trabajo SET work_date = ?, start_time = ?, end_time = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE horario_trabajo_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [horarioTrabajoData.work_date, horarioTrabajoData.start_time, horarioTrabajoData.end_time, horarioTrabajoData.updated_at, horarioTrabajoData.updated_by, horarioTrabajoData.deleted, horario_trabajo_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedHorarioTrabajo: HorarioTrabajo = { ...horarioTrabajoData, horario_trabajo_id };
            resolve(updatedHorarioTrabajo);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteHorarioTrabajo(horario_trabajo_id: number): Promise<boolean> {
    const query = 'DELETE FROM horario_trabajo WHERE horario_trabajo_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [horario_trabajo_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el horario a eliminar
          }
        }
      });
    });
  }
}
