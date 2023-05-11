import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iConsenso } from '../../interface/i-consenso';
import { iSindromePredominante } from '../../interface/i-sindromepredominante';
import { ExpdienteService } from '../../service/expediente.service';
import { SindromepredominanteComponent } from './sindromepredominante/sindromepredominante.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consensomedico',
  templateUrl: './consensomedico.component.html',
  styleUrls: ['./consensomedico.component.scss']
})

export class ConsensomedicoComponent implements OnInit {

  public isLinear = false;
  public val: Validacion = new Validacion();

  @ViewChild('Sindrome', { static: true })
  public Sindrome: SindromepredominanteComponent;

  private _CatalogoService: CatalogoService;
  private _ExpdienteService: ExpdienteService;
  public IdPaciente : Number = 0;


  public rdDetCognitivo : Number = 1;
  public rdSospechaDiag : Number = 1;
  

  
  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) { 

    //[ REGLAS]
    this.val.add("rdDetCognitivo","1", "LEN>=", "0");
    this.val.add("txtDetNormal","1", "LEN>", "0");
    this.val.add("txtDetLeve","1", "LEN>=", "0");
    this.val.add("txtDetMayor","1", "LEN>=", "0");    

    this.val.add("chkDepre", "1", "LEN>=", "0");
    this.val.add("txtDepresion", "1", "LEN>=", "0");
    this.val.add("chkBipolar", "1", "LEN>=", "0");
    this.val.add("txtBipolar", "1", "LEN>=", "0");
    this.val.add("chkEsquizo", "1", "LEN>=", "0");
    this.val.add("txtEsquizo", "1", "LEN>=", "0");
    this.val.add("chkOtroDiag", "1", "LEN>=", "0");
    this.val.add("txtOtroDiag", "1", "LEN>=", "0");

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

  this.val.Replace("txtDetNormal", "1", "LEN>=", "0");
  this.val.Replace("txtDetLeve", "1", "LEN>=", "0");
  this.val.Replace("txtDetMayor", "1", "LEN>=", "0");
  


  this.val.ValForm.get("txtDetNormal")?.disable();
  this.val.ValForm.get("txtDetLeve")?.disable();
  this.val.ValForm.get("txtDetMayor")?.disable();

  
    

  if (value == 1) {
    this.val.ValForm.get("txtDetNormal")?.enable();
    
    this.val.Replace("txtDetNormal","1", "LEN>", "0");


    
    this.val.ValForm.get("txtDetLeve")?.setValue("");
    this.val.ValForm.get("txtDetMayor")?.setValue("");
  }

  if (value == 2) {
    this.val.ValForm.get("txtDetLeve")?.enable();
    this.val.Replace("txtDetLeve","1", "LEN>", "0");
    this.val.ValForm.get("txtDetNormal")?.setValue("");
    this.val.ValForm.get("txtDetMayor")?.setValue("");
  }

  if (value == 3) {
    this.val.ValForm.get("txtDetMayor")?.enable();
    this.val.Replace("txtDetMayor","1", "LEN>", "0");  
    this.val.ValForm.get("txtDetNormal")?.setValue("");
    this.val.ValForm.get("txtDetLeve")?.setValue("");  
  }
}

//********SOSPECHA DIAGNOSTICA******/
public f_SospechaDiag(value : any): void {

  this.val.Replace("txtDiagProbable", "1", "LEN>=", "0");
  this.val.Replace("txtDiagConfir", "1", "LEN>=", "0");

  this.val.ValForm.get("txtDiagProbable")?.disable();
  this.val.ValForm.get("txtDiagConfir")?.disable();
  

  if (value == 1) {
    this.val.ValForm.get("txtDiagProbable")?.enable();
    this.val.ValForm.get("txtDiagConfir")?.setValue("");
    this.val.Replace("txtDiagProbable", "1", "LEN>=", "0");
  }

  if (value == 2) {
    this.val.ValForm.get("txtDiagConfir")?.enable();
    this.val.ValForm.get("txtDiagProbable")?.setValue("");
    this.val.Replace("txtDiagConfir", "1", "LEN>=", "0");
  }
 
}
//********************************/



//***OTRO DIAGNOSTICO */

//***DEPRESION ******/

public f_RefDepre(): void {

  this.val.Replace("txtDepresion", "1", "LEN>=", "0");


  this.val.ValForm.get("txtDepresion")?.disable();

  if (this.val.ValForm.get("chkDepre")?.value == true) {
    this.val.ValForm.get("txtDepresion")?.enable();
    this.val.add("txtDepresion", "1", "LEN>", "0");

  }
}
//********************* */

//*******BIPOLAR*******/

public f_RefBipolar(): void {

  this.val.Replace("chkBipolar", "1", "LEN>=", "0");

  this.val.ValForm.get("txtBipolar")?.disable();

  if (this.val.ValForm.get("chkBipolar")?.value == true) {
    this.val.ValForm.get("txtBipolar")?.enable();
    this.val.Replace("txtBipolar", "1", "LEN>", "0");
  }
}

//****************************** */

//********ESQUIZOFRENIA */
public f_RefEsquizo(): void {

  this.val.Replace("txtEsquizo", "1", "LEN>=", "0");
  this.val.ValForm.get("txtEsquizo")?.disable();

  if (this.val.ValForm.get("chkEsquizo")?.value == true) {
    this.val.ValForm.get("txtEsquizo")?.enable();
    this.val.Replace("txtEsquizo", "1", "LEN>", "0");
  }
}

//************************** */

//****** OTRO DIAG*/
public f_RefOtroDiag(): void {

  this.val.Replace("txtOtroDiag", "1", "LEN>=", "0");
  this.val.ValForm.get("txtOtroDiag")?.disable();

  if (this.val.ValForm.get("chkOtroDiag")?.value == true) {
    this.val.ValForm.get("txtOtroDiag")?.enable();
    this.val.Replace("txtOtroDiag", "1", "LEN>", "0");
  }
}

//*************** */


public Guardar(){

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

C.DetCognitivo = this.rdDetCognitivo;
C.SospechaDiag = this.rdSospechaDiag;
C.RefNormal = this.val.ValForm.get("txtDetNormal")?.value;
C.RefLeve =this.val.ValForm.get("txtDetLeve")?.value;
C.RefMayor = this.val.ValForm.get("txtDetMayor")?.value;
C.Depresion = this.val.ValForm.get("chkDepre")?.value;
C.RefDepresion = this.val.ValForm.get("txtDepresion")?.value;
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
C.TSindromePredominante = this.Sindrome.dataSource.data;
C.IdPaciente = this.IdPaciente;


this._ExpdienteService.GuardarConsenso(C);



}

private LlenarConsenso(datos : any)
{
  let _json = JSON.parse(datos);

  let C: iConsenso  =  _json["d"][0];

   this.rdDetCognitivo = C.DetCognitivo;
   this.rdSospechaDiag = C.SospechaDiag;
   this.val.ValForm.get("txtDetNormal")?.setValue(C.RefNormal);
   this.val.ValForm.get("txtDetLeve")?.setValue(C.RefLeve);
   this.val.ValForm.get("txtDetMayor")?.setValue(C.RefMayor);
   this.val.ValForm.get("chkDepre")?.setValue(C.Depresion);
   this.val.ValForm.get("txtDepresion")?.setValue(C.RefDepresion);
   this.val.ValForm.get("chkBipolar")?.setValue(C.TrastornoBip);
   this.val.ValForm.get("txtBipolar")?.setValue(C.RefTrasBip);
   this.val.ValForm.get("chkEsquizo")?.setValue(C.Esquizo);
   this.val.ValForm.get("txtEsquizo")?.setValue(C.RefEsquizo);
   this.val.ValForm.get("chkOtroDiag")?.setValue(C.OtroDiag);
   this.val.ValForm.get("txtOtroDiag")?.setValue(C.RefOTroDiag);
   this.val.ValForm.get("txtDiagProbable")?.setValue(C.RefProbable);
   this.val.ValForm.get("txtDiagConfir")?.setValue(C.RefConfirmado);
   this.val.ValForm.get("txtTraFarma")?.setValue(C.TrataFarma);
   this.val.ValForm.get("txtTraNoFarma")?.setValue(C.TrataNoFarma);
   this.val.ValForm.get("txtRecomendaciones")?.setValue(C.Recomendaciones);
   this.val.ValForm.get("txtExamenes")?.setValue(C.Examenes);


}


private LlenarSindrome(datos : any)
{
  let _json = JSON.parse(datos);


  this.Sindrome.dataSource.data.splice(0, this.Sindrome.dataSource.data.length);

  this.Sindrome.dataSource.data =  _json["d"];

}

   Cerrar() : void{
    
   this.ServerScv.CerrarFormulario();
}

  ngOnInit(): void {

    this.limpiar();

    this.ServerScv.change.subscribe(s => {
      if(s[0] == "Menu Expediente"){
        this.IdPaciente =  s[1];
        this._ExpdienteService.BuscarConcenso(this.IdPaciente);
        this._ExpdienteService.BuscarSindrome(this.IdPaciente);
      }
    });

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
        if(s[0] == "Llenar_Consenso") this.LlenarConsenso(s[1] );
        if(s[0] == "Llenar_Sindrome") this.LlenarSindrome(s[1] );

      }
    );


    this.ServerScv.change.subscribe(s => {

      if(s[0] == "Menu Expediente") this.IdPaciente =  s[1];
      if(s[0] == "Cerrar Expediente") this.IdPaciente = 0

    });



  }

}
