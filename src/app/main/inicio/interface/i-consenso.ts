import { iSindromePredominante } from "./i-sindromepredominante";

export interface iConsenso{
rdDetCognitivo: Number,
rdSospechaDiag: Number,
RefNormal: String,
RefLeve: String,
RefMayor: String,
Depresion: String,
RefDepre: String,
TrastornoBip: String,
RefTrasBip: String,
Esquizo: String,
RefEsquizo: String,
OtroDiag: String,
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
