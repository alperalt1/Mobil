import { Nota } from "./NotaInterface"

export interface Usuario {
    IdUsuario: number,
    Correo: string,
    Contraseña: string,
    Nota: {
        IdNota: number,
        Titulo: string,
        Descripcion: string,
        Estado: boolean,
        Fecha: string
    }
}