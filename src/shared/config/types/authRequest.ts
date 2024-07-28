import { Request } from "express";
import { UserPayLoad } from "./UserPayLoad";


export interface AuthRequest extends Request {
    UserData?: UserPayLoad;
}