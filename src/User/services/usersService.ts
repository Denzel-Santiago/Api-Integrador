import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";
import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";
const saltRounds = 10;

export class UserService {

  public static async login(full_name: string, password: string) {
    try {
      const user = await this.getUserByFullName(full_name);
      if (!user) {
        return null;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return null;
      }

      const payload = {
        user_id: user.user_id,
        role_id: user.role_id,
        full_name: user.full_name
      }
      return await jwt.sign(payload, secretKey, { expiresIn: '5m' });

    } catch (error: any) {
      throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
  }

  public static async getAllUsers(): Promise<User[]> {
    try {
      return await UserRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }

  public static async getUserById(userId: number): Promise<User | null> {
    try {
      return await UserRepository.findById(userId);
    } catch (error: any) {
      throw new Error(`Error al encontrar usuario: ${error.message}`);
    }
  }

  public static async getUserByFullName(full_name: string): Promise<User | null> {
    try {
      return await UserRepository.findByFullName(full_name);
    } catch (error: any) {
      throw new Error(`Error al encontrar usuario: ${error.message}`);
    }
  }

  public static async addUser(user: User) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      user.created_at = DateUtils.formatDate(new Date());
      user.updated_at = DateUtils.formatDate(new Date());
      user.password = await bcrypt.hash(user.password, salt);
      return await UserRepository.createUser(user);
    } catch (error: any) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  public static async modifyUser(userId: number, userData: User) {
    try {
      const userFinded = await UserRepository.findById(userId);
      const salt = await bcrypt.genSalt(saltRounds);

      if (userFinded) {
        if (userData.full_name) {
          userFinded.full_name = userData.full_name;
        }
        if (userData.password) {
          userFinded.password = await bcrypt.hash(userData.password, salt);
        }
        if (userData.role_id) {
          userFinded.role_id = userData.role_id;
        }
        if (userData.email) {
          userFinded.email = userData.email;
        }
        if (userData.phone) {
          userFinded.phone = userData.phone;
        }
        if (userData.deleted) {
          userFinded.deleted = userData.deleted;
        }
      } else {
        return null;
      }
      userFinded.updated_by = userData.updated_by;
      userFinded.updated_at = DateUtils.formatDate(new Date());
      return await UserRepository.updateUser(userId, userFinded);
    } catch (error: any) {
      throw new Error(`Error al modificar usuario: ${error.message}`);
    }
  }

  public static async deleteUser(userId: number): Promise<boolean> {
    try {
      return await UserRepository.deleteUser(userId);
    } catch (error: any) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }
}
