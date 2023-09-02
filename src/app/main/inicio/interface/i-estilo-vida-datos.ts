import { iEstiloVida } from "./i-estilo-vida";
import { iEstiloVidaAlimentacion } from "./i-estilo-vida-alimentacion";
import { iEstiloVidaEjercicio } from "./i-estilo-vida-ejercicio";

export interface iEstiloVidaDatos{
    EstiloVida : iEstiloVida;
    Ejercicios : iEstiloVidaEjercicio[]; 
    Alimentacion : iEstiloVidaAlimentacion[]; 
}