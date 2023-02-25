import { iSindromePredominante } from "./i-sindromepredominante";

export interface iConsenso{
DetCognitivo: Number,
SospechaDiag: Number,
RefNormal: String,
RefLeve: String,
RefMayor: String,
Depresion: Boolean,
RefDepresion: String,
TrastornoBip: Boolean,
RefTrasBip: String,
Esquizo: Boolean,
RefEsquizo: String,
OtroDiag: Boolean,
RefOTroDiag: String,
RefProbable: String,
RefConfirmado: String,
TrataFarma: String,
TrataNoFarma: String,
Recomendaciones: String,
Examenes: String,
TSindromePredominante: iSindromePredominante[],
IdPaciente: Number

}
