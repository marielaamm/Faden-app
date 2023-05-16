import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iAntecedenteNeuroPsiquiatrico } from 'src/app/main/inicio/interface/i-antecedente-neuro-psiquiatrico';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-nuevo-antecedente-neurosiquiatrico',
  templateUrl: './nuevo-antecedente-neurosiquiatrico.component.html',
  styleUrls: ['./nuevo-antecedente-neurosiquiatrico.component.scss']
})
export class NuevoAntecedenteNeurosiquiatricoComponent implements OnInit {

  public val: Validacion = new Validacion ();
  public IdPaciente : Number = 0;
  public ID : Number = 0;

  

  public rdVive : String = "";
  public rdPadece : String = "";
  public rdParentesco : String = "";
  
  constructor(private ServerScv: ServerService, private _Dialog: MatDialog, private _ExpdienteService: ExpdienteService) { 

    this.val.add("txtNombre", "1", "LEN>", "0");
    this.val.add("txtNombre", "2", "LEN<=", "100");
    this.val.add("rdVive", "1", "LEN>=", "0");
    this.val.add("txtEnfermedad", "1", "LEN>", "0");
    this.val.add("txtEnfermedad", "2", "LEN<=", "500");
    this.val.add("rdPadece", "1", "LEN>=", "0");
    this.val.add("rdParentesco", "1", "LEN>=", "0");

    
    
    this.Limpiar();
    
  }

  public Limpiar()
  {
    this.rdVive = "Si";
    this.rdPadece = "Si";
    this.rdParentesco = "Padre";
    this.val.ValForm.get("txtNombre")?.setValue("");
    this.val.ValForm.get("txtEnfermedad")?.setValue("");

    this.ID = 0;
  }


  Cerrar(): void {

    this.ServerScv.change.emit(["CerrarDialog","frmAntNeuroPsiquiatrico", ""]);

  }

  public v_Guardar(){

    let esError: string = "";
    let mensaje: string = "<ol>";

    if (this.val.ValForm.get("txtNombre")?.invalid) {
      mensaje += "<li>Ingrese un nombre o revise la cantidad de caracteres.</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtEnfermedad")?.invalid) {
      mensaje += "<li>Ingrese una enfermedad o revise la cantidad de caracteres.</li>";
      esError += "1";
    }


    mensaje += "</ol>";

    if (esError.includes("1")) {
      let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + mensaje + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";

      let _json = JSON.parse(s);
      this._Dialog.open(DialogoComponent, {
        data: _json["msj"]
      });
      return;


    }
    
   
    let T: iAntecedenteNeuroPsiquiatrico = {}as iAntecedenteNeuroPsiquiatrico;
    T.Nombre = this.val.ValForm.get("txtNombre")?.value;
    T.Enfermedad = this.val.ValForm.get("txtEnfermedad")?.value;
    T.Vive = this.rdVive;
    T.Padece = this.rdPadece;
    T.Parentesco = this.rdParentesco;
    T.IdPaciente = this.IdPaciente;
    T.IdAntNeuroPsiq = this.ID;
    this._ExpdienteService.GuardarAntNeuroPsiquiatrico(T);

  }

  ngOnInit(): void {

 
    
    this._ExpdienteService.change.subscribe(

      s => {

        if (s[0] == "dato_Ant_NeuroPsiquiatrico_Guardar") {

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
  
          this.Cerrar();
          
        }


      }
    );


    
  }

}
