import { Component, OnInit } from '@angular/core';
import { ExpdienteService } from '../../../service/expediente.service';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { iValoracionNeuroPsicologica } from '../../../interface/i-valoracion-neuropsicologica';

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

   


    this.val.add("chkMemoria", "1", "LEN>=", "0");
    this.val.add("txtMemoria", "1", "LEN>=", "0");
    this.val.add("chkFuncionEjec", "1", "LEN>=", "0");
    this.val.add("txtFuncionEjec", "1", "LEN>=", "0");
    this.val.add("chkLenguaje", "1", "LEN>=", "0");
    this.val.add("txtLenguaje", "1", "LEN>=", "0");
    this.val.add("chkFuncVisoEspaciales", "1", "LEN>=", "0");
    this.val.add("txtFuncVisoEsp", "1", "LEN>=", "0");
    this.val.add("chkFuncMotoras", "1", "LEN>=", "0");
    this.val.add("txtFuncMotoras", "1", "LEN>=", "0");
    this.val.add("chkEmociones", "1", "LEN>=", "0");
    this.val.add("txtEmociones", "1", "LEN>=", "0");
    this.val.add("chkSueno", "1", "LEN>=", "0");
    this.val.add("txtSueno", "1", "LEN>=", "0");
    this.limpiar();

   }


   public limpiar(){

    this.val.ValForm.get("chkMemoria")?.setValue(false);
    this.val.ValForm.get("txtMemoria")?.setValue("");
    this.val.ValForm.get("txtMemoria")?.disable();
    
    this.val.ValForm.get("chkFuncionEjec")?.setValue(false);
    this.val.ValForm.get("txtFuncionEjec")?.setValue("");
    this.val.ValForm.get("txtFuncionEjec")?.disable();
    

    this.val.ValForm.get("chkLenguaje")?.setValue(false);
    this.val.ValForm.get("txtLenguaje")?.setValue("");
    this.val.ValForm.get("txtLenguaje")?.disable();


    this.val.ValForm.get("chkFuncVisoEspaciales")?.setValue(false);
    this.val.ValForm.get("txtFuncVisoEsp")?.setValue("");
    this.val.ValForm.get("txtFuncVisoEsp")?.disable();

    this.val.ValForm.get("chkFuncMotoras")?.setValue(false);
    this.val.ValForm.get("txtFuncMotoras")?.setValue("");
    this.val.ValForm.get("txtFuncMotoras")?.disable();
    

    this.val.ValForm.get("chkEmociones")?.setValue(false);
    this.val.ValForm.get("txtEmociones")?.setValue("");
    this.val.ValForm.get("txtEmociones")?.disable();


    this.val.ValForm.get("chkSueno")?.setValue(false);
    this.val.ValForm.get("txtSueno")?.setValue("");
    this.val.ValForm.get("txtSueno")?.disable();
  

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


public Guardar(){

  let esError: string = " ";
  let mensaje: string = "<ol>";

   //[Inicio - Validaciones]

  if (this.val.ValForm.get("txtMemoria")?.invalid) {
    mensaje += "<li>Describa el dominio cognitivo o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtFuncionEjec")?.invalid) {
    mensaje += "<li>Describa el dominio cognitivo o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtLenguaje")?.invalid) {
    mensaje += "<li>Describa el dominio cognitivo o revise la cantidad de caracteres</li>";
    esError += "1";    
  }

  if (this.val.ValForm.get("txtFuncVisoEsp")?.invalid) {
    mensaje += "<li>Describa el dominio cognitivo o revise la cantidad de caracteres</li>";
    esError += "1";    
  }

  if (this.val.ValForm.get("txtFuncMotoras")?.invalid) {
    mensaje += "<li>Describa el dominio cognitivo o revise la cantidad de caracteres</li>";
    esError += "1";    
  }

  if (this.val.ValForm.get("txtSueno")?.invalid) {
    mensaje += "<li>Describa el dominio cognitivo o revise la cantidad de caracteres</li>";
    esError += "1";    
  }

  if (this.val.ValForm.get("txtEmociones")?.invalid) {
    mensaje += "<li>Describa el dominio cognitivo o revise la cantidad de caracteres</li>";
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


  let V: iValoracionNeuroPsicologica = {} as iValoracionNeuroPsicologica;

  V.Memoria = this.val.ValForm.get("txtMemoria")?.value;
  V.FuncionesEjecutivas = this.val.ValForm.get("txtFuncionEjec")?.value;
  V.Lenguaje = this.val.ValForm.get("txtLenguaje")?.value;
  V.FuncionesVisoEspaciales = this.val.ValForm.get("txtFuncVisoEsp")?.value;
  V.FuncionesMotoras = this.val.ValForm.get("txtFuncMotoras")?.value;
  V.Comportamiento = this.val.ValForm.get("txtEmociones")?.value;
  V.FuncionAutonomica = this.val.ValForm.get("txtSueno")?.value;
  V.IdPaciente = this.IdPaciente;

  this._ExpdienteService.GuardarValoracion(V);
}

private LlenarValoracion(datos : any)
{
  let _json = JSON.parse(datos);

  let V: iValoracionNeuroPsicologica =  _json["d"][0];

   
   this.val.ValForm.get("txtMemoria")?.setValue(V.Memoria);
   this.val.ValForm.get("txtFuncionEjec")?.setValue(V.FuncionesEjecutivas);
   this.val.ValForm.get("txtLenguaje")?.setValue(V.Lenguaje);
   this.val.ValForm.get("txtFuncVisoEsp")?.setValue(V.FuncionesVisoEspaciales);
   this.val.ValForm.get("txtFuncMotoras")?.setValue(V.FuncionesMotoras);
   this.val.ValForm.get("txtEmociones")?.setValue(V.Comportamiento);
   this.val.ValForm.get("txtSueno")?.setValue(V.FuncionAutonomica);
    
}

  Cerrar() : void{
    
    this.ServerScv.CerrarFormulario();
 }
  

  ngOnInit(): void {

    this.limpiar();

    this.ServerScv.change.subscribe(s => {
      if(s[0] == "Menu Expediente"){
        this.IdPaciente =  s[1];
        this._ExpdienteService.BuscarValoracionNeuro(this.IdPaciente);
       
      }
    });

    this._ExpdienteService.change.subscribe(

      s => {

        if (s[0] == "dato_Valoracion_Guardar") {

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

        if(s[0] == "Llenar_Valoracion") this.LlenarValoracion(s[1] );

      }
    );

   
    this.ServerScv.change.subscribe(s => {

      if(s[0] == "Menu Expediente") this.IdPaciente =  s[1];
      if(s[0] == "Cerrar Expediente") this.IdPaciente = 0

    });

  }

}
