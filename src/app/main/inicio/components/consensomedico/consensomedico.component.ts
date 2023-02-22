import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iConsenso } from '../../interface/i-consenso';
import { iSindromePredominante } from '../../interface/i-sindromepredominante';
import { ExpdienteService } from '../../service/expediente.service';
import { SindromepredominanteComponent } from './sindromepredominante/sindromepredominante.component';

@Component({
  selector: 'app-consensomedico',
  templateUrl: './consensomedico.component.html',
  styleUrls: ['./consensomedico.component.scss']
})
export class ConsensomedicoComponent implements OnInit {

  public isLinear = false;
  public val: Validacion = new Validacion();
  public Sindrome: SindromepredominanteComponent;

  private _CatalogoService: CatalogoService;
  private _ExpdienteService: ExpdienteService;


  public rdDetCognitivo : Number = 1;
  public rdSospechaDiag : Number = 1;
  

  
  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) { 

    //[ REGLAS]
    this.val.add("rdDetCognitivo","1", "LEN>=", "0");
    this.val.add("txtDetNormal","1", "LEN>", "0");
    this.val.add("txtDetLeve","1", "LEN>", "0");
    this.val.add("txtDetMayor","1", "LEN>", "0");    

    this.val.add("chkDepre", "1", "LEN>", "0");
    this.val.add("txtDepresion", "1", "LEN>", "0");
    this.val.add("chkBipolar", "1", "LEN>", "0");
    this.val.add("txtBipolar", "1", "LEN>", "0");
    this.val.add("chkEsquizo", "1", "LEN>", "0");
    this.val.add("txtEsquizo", "1", "LEN>", "0");
    this.val.add("chkOtroDiag", "1", "LEN>", "0");
    this.val.add("txtOtroDiag", "1", "LEN>", "0");

    this.val.add("rdSospechaDiag","1", "LEN>=", "0");
    this.val.add("txtDiagProbable","1", "LEN>", "0");
    this.val.add("txtDiagConfir","1", "LEN>", "0");

    this.val.add("txtTraFarma","1", "LEN>","0");
    this.val.add("txtTraNoFarma","1", "LEN>","0");
    this.val.add("txtRecomendaciones","1", "LEN>","0");
    this.val.add("txtExamenes","1", "LEN>","0");

    this._ExpdienteService = new ExpdienteService(this._Dialog);
    this._CatalogoService = new CatalogoService(this._Dialog);

    this.limpiar();

   

  }

  public limpiar(){
    this.rdDetCognitivo = 1;
    this.rdSospechaDiag = 1;

    this.val.ValForm.get("txtDetNormal")?.setValue("");
    this.val.ValForm.get("txtDetNormal")?.enable();

    this.val.ValForm.get("txtDetLeve")?.setValue("");
    this.val.ValForm.get("txtDetLeve")?.disable();

    this.val.ValForm.get("txtDetMayor")?.setValue("");
    this.val.ValForm.get("txtDetMayor")?.disable();


    this.val.ValForm.get("chkDepre")?.setValue(false);
    this.val.ValForm.get("txtDepresion")?.setValue("");
    this.val.ValForm.get("txtDepresion")?.disable();
    
    this.val.ValForm.get("chkBipolar")?.setValue(false);
    this.val.ValForm.get("txtBipolar")?.setValue("");
    this.val.ValForm.get("txtBipolar")?.disable();
    

    this.val.ValForm.get("chkEsquizo")?.setValue(false);
    this.val.ValForm.get("txtEsquizo")?.setValue("");
    this.val.ValForm.get("txtEsquizo")?.disable();


    this.val.ValForm.get("chkOtroDiag")?.setValue(false);
    this.val.ValForm.get("txtOtroDiag")?.setValue("");
    this.val.ValForm.get("txtOtroDiag")?.disable();



    this.val.ValForm.get("txtDiagProbable")?.setValue("");
    this.val.ValForm.get("txtDiagConfir")?.setValue("");
    this.val.ValForm.get("txtDiagConfir")?.disable();



    this.val.ValForm.get("txtTraFarma")?.setValue("");
    this.val.ValForm.get("txtTraNoFarma")?.setValue("");
    this.val.ValForm.get("txtRecomendaciones")?.setValue("");
    this.val.ValForm.get("txtExamenes")?.setValue("");

    

    if(this.Sindrome != undefined)
    {
      this.Sindrome?.dataSource.data.splice(0, this.Sindrome.dataSource.data.length);
      this.Sindrome.dataSource.filter = "";
    }

    this._ExpdienteService = new ExpdienteService(this._Dialog);
    this._CatalogoService = new CatalogoService(this._Dialog);

  }
  
  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}
// ****NIVEL DE DETERIORO COGNITIVO*****/


public f_DetCognitivo(value : any): void {

  this.val.ValForm.get("txtDetNormal")?.disable();
  this.val.ValForm.get("txtDetLeve")?.disable();
  this.val.ValForm.get("txtDetMayor")?.disable();

  if (value == 1) {
    this.val.ValForm.get("txtDetNormal")?.enable();
  }

  if (value == 2) {
    this.val.ValForm.get("txtDetLeve")?.enable();
  }

  if (value == 3) {
    this.val.ValForm.get("txtDetMayor")?.enable();
  }
}

//********SOSPECHA DIAGNOSTICA******/
public f_SospechaDiag(value : any): void {

  this.val.ValForm.get("txtDiagProbable")?.disable();
  this.val.ValForm.get("txtDiagConfir")?.disable();
  

  if (value == 1) {
    this.val.ValForm.get("txtDiagProbable")?.enable();
  }

  if (value == 2) {
    this.val.ValForm.get("txtDiagConfir")?.enable();
  }
 
}
//********************************/



//***OTRO DIAGNOSTICO */

//***DEPRESION ******/

public f_RefDepre(): void {

  this.val.ValForm.get("txtDepresion")?.disable();

  if (this.val.ValForm.get("chkDepre")?.value == true) {
    this.val.ValForm.get("txtDepresion")?.enable();
  }
}
//********************* */

//*******BIPOLAR*******/

public f_RefBipolar(): void {

  this.val.ValForm.get("txtBipolar")?.disable();

  if (this.val.ValForm.get("chkBipolar")?.value == true) {
    this.val.ValForm.get("txtBipolar")?.enable();
  }
}

//****************************** */

//********ESQUIZOFRENIA */
public f_RefEsquizo(): void {

  this.val.ValForm.get("txtEsquizo")?.disable();

  if (this.val.ValForm.get("chkEsquizo")?.value == true) {
    this.val.ValForm.get("txtEsquizo")?.enable();
  }
}

//************************** */

//****** OTRO DIAG*/
public f_RefOtroDiag(): void {

  this.val.ValForm.get("txtOtroDiag")?.disable();

  if (this.val.ValForm.get("chkOtroDiag")?.value == true) {
    this.val.ValForm.get("txtOtroDiag")?.enable();
  }
}

//*************** */


public Guardar (){

  let esError: string = " ";
  let mensaje: string = "<ol>";

  //[Inicio - Validaciones]

  if (this.val.ValForm.get("txtDetNormal")?.invalid) {
    mensaje += "<li>Describa el nivel de deterioro o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtDetLeve")?.invalid) {
    mensaje += "<li>Describa el nivel de deterioro o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtDetMayor")?.invalid) {
    mensaje += "<li>Describa el nivel de deterioro o revise la cantidad de caracteres</li>";
    esError += "1";    
  }

  if (this.val.ValForm.get("txtDepresion")?.invalid) {
    mensaje += "<li>Describa el diagnostico o revise la cantidad de caracteres</li>";
    esError += "1";    
  }

  if (this.val.ValForm.get("txtBipolar")?.invalid) {
    mensaje += "<li>Describa el diagnostico o revise la cantidad de caracteres</li>";
    esError += "1";    
  }

  if (this.val.ValForm.get("txtEsquizo")?.invalid) {
    mensaje += "<li>Describa el diagnostico o revise la cantidad de caracteres</li>";
    esError += "1";    
  }

  if (this.val.ValForm.get("txtOtroDiag")?.invalid) {
    mensaje += "<li>Describa el diagnostico o revise la cantidad de caracteres</li>";
    esError += "1";    
  }

  if (this.val.ValForm.get("txtDiagProbable")?.invalid) {
    mensaje += "<li>Describa el diagnostico o revise la cantidad de caracteres</li>";
    esError += "1";    
  }

  if (this.val.ValForm.get("txtDiagConfir")?.invalid) {
    mensaje += "<li>Describa el diagnostico o revise la cantidad de caracteres</li>";
    esError += "1";    
  }



//[ Fin - Validaciones]
mensaje += "</ol>";

if (esError.includes("1")) {
  let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + mensaje + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
  let _json = JSON.parse(s);
  this._Dialog.open(DialogoComponent, {

    data: _json["msj"]
  });

  return;
}

let C: iConsenso= {} as iConsenso;

C.rdDetCognitivo = this.rdDetCognitivo;
C.RefNormal = this.val.ValForm.get("txtDetNormal")?.value;
C.RefLeve =this.val.ValForm.get("txtDetLeve")?.value;
C.RefMayor = this.val.ValForm.get("txtDetMayor")?.value;
C.Depresion = this.val.ValForm.get("chkDepre")?.value;
C.RefDepre = this.val.ValForm.get("txtDepresion")?.value;C
C.TrastornoBip = this.val.ValForm.get("chkBipolar")?.value;
C.RefTrasBip = this.val.ValForm.get("txtBipolar")?.value;
C.Esquizo = this.val.ValForm.get("chkEsquizo")?.value;;
C.RefEsquizo = this.val.ValForm.get("txtEsquizo")?.value;
C.OtroDiag = this.val.ValForm.get("chkOtroDiag")?.value;
C.RefOTroDiag = this.val.ValForm.get("txtOtroDiag")?.value;
C.RefProbable = this.val.ValForm.get("txtDiagProbable")?.value;
C.RefConfirmado = this.val.ValForm.get("txtDiagConfir")?.value;
C.TrataFarma = this.val.ValForm.get("txtTraFarma")?.value;
C.TrataNoFarma = this.val.ValForm.get("txtTraNoFarma")?.value;
C.Recomendaciones = this.val.ValForm.get("txtRecomendaciones")?.value;
C.Examenes = this.val.ValForm.get("txtExamenes")?.value;
C.TiSindromePredominante = this.Sindrome.dataSource.data;
C.IdPaciente = 1011;

this._ExpdienteService.GuardarConsenso(C);



}

   Cerrar() : void{
    
   this.ServerScv.CerrarFormulario();
}

  ngOnInit(): void {

    this._ExpdienteService.change.subscribe(

      s => {

        if (s[0] == "dato_Consenso_Guardar") {

          this.val.ValForm.enable();

          if (s[1] == undefined) {

            let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + "error al guardar" + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
            let _json = JSON.parse(s);
            this._Dialog.open(DialogoComponent, {
              data: _json["msj"]
            });
            return;
          }


          this._Dialog.open(DialogoComponent, {
            data: s[1]["msj"]
          });
  
          this.val.ValForm.get("txtNoExpediente")?.setValue(s[1]["d"].NoExpediente);
          this.val.ValForm.get("txtNoExpediente")?.disable();
        }


      }
    );



  }

}
