import { Request } from "express";
import { UserPayload } from "./UserPayLoad";


export interface AuthRequest extends Request {
    UserData?: UserPayload;
}