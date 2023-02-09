import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';
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
  

  
  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) { 

    //[ REGLAS]
    this.val.add("rdNormal", "1", "NUM>", "0");
    this.val.add("txtDetNormal","1", "LEN>", "0");
    this.val.add("rdLeve", "1", "NUM>", "0");
    this.val.add("txtDetLeve","1", "LEN>", "0");
    this.val.add("rdMayor", "1", "NUM>", "0");
    this.val.add("txtDetMayor","1", "LEN>", "0");    

    this.val.add("chkDepre", "1", "LEN>", "0");
    this.val.add("txtDepresion", "1", "LEN>", "0");
    this.val.add("chkBipolar", "1", "LEN>", "0");
    this.val.add("txtBipolar", "1", "LEN>", "0");
    this.val.add("chkEsquizo", "1", "LEN>", "0");
    this.val.add("txtEsquizo", "1", "LEN>", "0");
    this.val.add("chkOtroDiag", "1", "LEN>", "0");
    this.val.add("txtOtroDiag", "1", "LEN>", "0");

    this.val.add("rdProbable","1", "NUM>", "0");
    this.val.add("txtDiagProbable","1", "LEN>", "0");
    this.val.add("rdConfir", "1", "NUM>", "0");
    this.val.add("txtDiagConfir","1", "LEN>", "0");

    this.val.add("txtTraFarma","1", "LEN>","0");
    this.val.add("txtTraNoFarma","1", "LEN>","0");
    this.val.add("txtRecomendaciones","1", "LEN>","0");
    this.val.add("txtExamenes","1", "LEN>","0");

    this._ExpdienteService = new ExpdienteService(this._Dialog);

    this.limpiar();

   

  }

  public limpiar(){
    this.val.ValForm.get("rdNormal")?.setValue(false);
    this.val.ValForm.get("txtDetNormal")?.setValue("");
    this.val.ValForm.get("txtDetNormal")?.disable();

    this.val.ValForm.get("rdLeve")?.setValue(false);
    this.val.ValForm.get("txtDetLeve")?.setValue("");
    this.val.ValForm.get("txtDetLeve")?.disable();

    this.val.ValForm.get("rdMayor")?.setValue(false);
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


    this.val.ValForm.get("rdProbable")?.setValue("");
    this.val.ValForm.get("txtDiagProbable")?.setValue("");
    this.val.ValForm.get("txtDiagProbable")?.disable();


    this.val.ValForm.get("rdConfir")?.setValue("");
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

  }
  
  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

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
}

   Cerrar() : void{
    
   this.ServerScv.CerrarFormulario();
}

  ngOnInit(): void {
  }

}
