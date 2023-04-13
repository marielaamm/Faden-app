import { Component, OnInit } from '@angular/core';
import { ExpdienteService } from '../../../service/expediente.service';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';

@Component({
  selector: 'app-valoracion-neuropsicologica',
  templateUrl: './valoracion-neuropsicologica.component.html',
  styleUrls: ['./valoracion-neuropsicologica.component.scss']
})
export class ValoracionNeuropsicologicaComponent implements OnInit {

  private _ExpdienteService: ExpdienteService;
  public IdPaciente : Number = 0;
  public val: Validacion = new Validacion();

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {

   
    this._ExpdienteService = new ExpdienteService(this._Dialog);

    this.val.add("chkMemoria", "1", "LEN>=", "0");
    this.val.add("txtMemoria", "1", "LEN>=", "0");
    this.val.add("chkFuncionEjec", "1", "LEN>=", "0");
    this.val.add("txtFuncionEjec", "1", "LEN>=", "0");
    this.val.add("chkLenguaje", "1", "LEN>=", "0");
    this.val.add("txtLenguaje", "1", "LEN>=", "0");
    this.val.add("chkFuncVisoEspaciales", "1", "LEN>=", "0");
    this.val.add("txtFuncVisoEsp", "1", "LEN>=", "0");
    this.limpiar();

   }


   public limpiar(){
  

    this._ExpdienteService = new ExpdienteService(this._Dialog);


  }

  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}


/////****DOMINIOS COGNITIVOS*** */

//*******MEMORIA */
public f_RefMemo(): void {

  this.val.Replace("txtMemoria", "1", "LEN>=", "0");


  this.val.ValForm.get("txtMemoria")?.disable();

  if (this.val.ValForm.get("chkMemoria")?.value == true) {
    this.val.ValForm.get("txtMemoria")?.enable();
    this.val.add("txtMemoria", "1", "LEN>", "0");

  }
}

public f_RefFuncionEjec(): void {

  this.val.Replace("txtFuncionEjec", "1", "LEN>=", "0");


  this.val.ValForm.get("txtFuncionEjec")?.disable();

  if (this.val.ValForm.get("chkFuncionEjec")?.value == true) {
    this.val.ValForm.get("txtFuncionEjec")?.enable();
    this.val.add("txtFuncionEjec", "1", "LEN>", "0");

  }
}

public f_RefLenguaje(): void {

  this.val.Replace("txtLenguaje", "1", "LEN>=", "0");


  this.val.ValForm.get("txtLenguaje")?.disable();

  if (this.val.ValForm.get("chkLenguaje")?.value == true) {
    this.val.ValForm.get("txtLenguaje")?.enable();
    this.val.add("txtLenguaje", "1", "LEN>", "0");

  }
} 

public f_RefFuncVisoEsp(): void {

  this.val.Replace("txtFuncVisoEsp", "1", "LEN>=", "0");


  this.val.ValForm.get("txtLenguaje")?.disable();

  if (this.val.ValForm.get("chkFuncVisoEspaciales")?.value == true) {
    this.val.ValForm.get("txtFuncVisoEsp")?.enable();
    this.val.add("txtFuncVisoEsp", "1", "LEN>", "0");

  }
} 

public f_RefFuncMotora(): void {

  this.val.Replace("txtFuncMotoras", "1", "LEN>=", "0");


  this.val.ValForm.get("txtFuncMotoras")?.disable();

  if (this.val.ValForm.get("chkFuncMotoras")?.value == true) {
    this.val.ValForm.get("txtFuncMotoras")?.enable();
    this.val.add("txtFuncMotoras", "1", "LEN>", "0");

  }
}

public f_RefEmociones(): void {

  this.val.Replace("txtEmociones", "1", "LEN>=", "0");


  this.val.ValForm.get("txtEmociones")?.disable();

  if (this.val.ValForm.get("chkEmociones")?.value == true) {
    this.val.ValForm.get("txtEmociones")?.enable();
    this.val.add("txtEmociones", "1", "LEN>", "0");

  }
}

public f_RefSueno(): void {

  this.val.Replace("txtSueno", "1", "LEN>=", "0");


  this.val.ValForm.get("txtSueno")?.disable();

  if (this.val.ValForm.get("chkSueno")?.value == true) {
    this.val.ValForm.get("txtSueno")?.enable();
    this.val.add("txtSueno", "1", "LEN>", "0");

  }
}

  Cerrar() : void{
    
    this.ServerScv.CerrarFormulario();
 }
  

  ngOnInit(): void {

    this.limpiar();

   
    this.ServerScv.change.subscribe(s => {

      if(s[0] == "Menu Expediente") this.IdPaciente =  s[1];
      if(s[0] == "Cerrar Expediente") this.IdPaciente = 0

    });

  }

}
