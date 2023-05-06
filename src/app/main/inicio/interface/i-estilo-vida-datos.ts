import { iEstiloVidaAlimentacion } from "./i-estilo-vida-alimentacion";
import { iEstiloVidaEjercicio } from "./i-estilo-vida-ejercicio";

export interface iEstiloVidaDatos{
    EstiloVida : iEstiloVidaDatos;
    Ejercicios : iEstiloVidaEjercicio[]; 
    Alimentacion : iEstiloVidaAlimentacion[]; 
}