import { iAcompanante } from "./i-acompanante";

export interface iPaciente{
    IdPaciente: Number,
    NoExpediente: String,
    FechaIngreso: Date,
    PNombre: String,
    SNombre: String,
    PApellido: String,
    SApellido: String,
    Sexo: String,
    IdDepto: Number,
    IdCiudad: Number,
    FechaNacim: Date,
    Ocupacion: String,
    Identificacion: String,
    IdEscolaridad: Number,
    ECivil: String,
    Direccion: String,
    Telefono: String,
    Celular: String,
    Correo: String,
    Religion: String,
    Convive: String,
    Visita: String,
    RefVisita: String,
    Referencia: String,
    Trabaja: Boolean,
    RefTrabajo: String,
    UltimoTrabajo: Boolean,
    RefUltTrabajo: String,
    Jubilado: Boolean,
    Pensionado: Boolean,
    Estado: String,
    TAcompanante: iAcompanante[]  
    
}