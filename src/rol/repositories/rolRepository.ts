import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Rol } from '../models/rol';

export class RolRepository {
  public static async findAll(): Promise<Rol[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT rol_id, title FROM rol', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const roles: Rol[] = results as Rol[];
          resolve(roles);
        }
      });
    });
  }

  public static async findById(rol_id: number): Promise<Rol | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM rol WHERE rol_id = ?', [rol_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const roles: Rol[] = results as Rol[];
          if (roles.length > 0) {
            resolve(roles[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByTitle(title: string): Promise<Rol | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM rol WHERE title = ?', [title], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const roles: Rol[] = results as Rol[];
          if (roles.length > 0) {
            resolve(roles[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createRol(rol: Rol): Promise<Rol> {
    const query = 'INSERT INTO rol (title, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [rol.title, rol.created_at, rol.created_by, rol.updated_at, rol.updated_by, rol.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdRolId = result.insertId;
          const createdRol: Rol = { ...rol, rol_id: createdRolId };
          resolve(createdRol);
        }
      });
    });
  }

  public static async updateRol(rol_id: number, rolData: Rol): Promise<Rol | null> {
    const query = 'UPDATE rol SET title = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE rol_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [rolData.title, rolData.updated_at, rolData.updated_by, rolData.deleted, rol_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedRol: Rol = { ...rolData, rol_id };
            resolve(updatedRol);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteRol(rol_id: number): Promise<boolean> {
    const query = 'DELETE FROM rol WHERE rol_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [rol_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }
}
