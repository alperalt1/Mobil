import { Nota } from "./NotaInterface";

export interface Usuario {
    IdUsuario: number,
    Correo: string,
    Contraseña: string,
    Notas: Nota[]
}