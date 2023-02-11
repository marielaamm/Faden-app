import { iSindromePredominante } from "./i-sindromepredominante";

export interface iConsenso{
Normal: String,
RefNormal: String,
Leve: String,
RefLeve: String,
Mayor: String,
RefMayor: String,
Depresion: String,
RefDepre: String,
TrastornoBip: String,
RefTrasBip: String,
Esquizo: String,
RefEsquizo: String,
OtroDiag: String,
RefOTroDiag: String,
Probable: String,
RefProbable: String,
Confirmado: String,
RefConfirmado: String,
TrataFarma: String,
TrataNoFarma: String,
Recomendaciones: String,
Examenes: String,
TiSindromePredominante: iSindromePredominante[]

}
