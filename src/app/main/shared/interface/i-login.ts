import { I_Nav } from "./i-Nav";

export interface iLogin{
    User: string;
    Nombre : string;
    Pwd : string;
    Rol: string;
    IdMedico : number;
    FechaLogin: string;
    Desconecion : boolean;
    FechaServer : string;
    TimeOut: number;
    Acceso : I_Nav[];
}