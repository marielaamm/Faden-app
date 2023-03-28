import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iAntecedentePatologico } from 'src/app/main/inicio/interface/i-antecedente-patologico';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-nuevo-antecedente-patologico',
  templateUrl: './nuevo-antecedente-patologico.component.html',
  styleUrls: ['./nuevo-antecedente-patologico.component.scss']
})
export class NuevoAntecedentePatologicoComponent implements OnInit {

  public val: Validacion = new Validacion ();
  public IdPaciente : Number = 0;
  private _ExpdienteService: ExpdienteService;

  constructor(private ServerScv: ServerService, private _Dialog: MatDialog) {

    this.val.add("txtAntecedente", "1", "LEN>", "0");
    this.val.add("txtAntecedente", "2", "LEN<=", "50");
    this.val.add("txtDescripcion", "1", "LEN>", "0");
    this.val.add("txtDescripcion", "2", "LEN<=", "50");

    this._ExpdienteService = new ExpdienteService(this._Dialog);
    
    this.Limpiar();
    
   }

   public Limpiar()
  {
    
    this.val.ValForm.get("txtAntecedente")?.setValue("");
    this.val.ValForm.get("txtDescripcion")?.setValue("");
   
  }

  Cerrar(): void {

    this.ServerScv.change.emit(["CerrarDialog","frmAntecedentePatologico", ""]);

  }

  public v_Guardar(){

    let esError: string = "";
    let mensaje: string = "<ol>";

    if (this.val.ValForm.get("txtAntecedente")?.invalid) {
      mensaje += "<li>Ingrese el nombre del tratamiento o revise la cantidada de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtDescripcion")?.invalid) {
      mensaje += "<li>Ingrese la dosis o revise la cantidada de caracteres</li>";
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
    
   
    let A: iAntecedentePatologico = {} as iAntecedentePatologico;
    A.Enfermedad = this.val.ValForm.get("txtAntecedente")?.value;
    A.Descripcion  = this.val.ValForm.get("txtDescripcion")?.value;
    A.IdPaciente = this.IdPaciente;
    
    this._ExpdienteService.GuardarAntecedentePatologico(A);

  }


  ngOnInit(): void {

    this._ExpdienteService.change.subscribe(

      s => {

        if (s[0] == "dato_AntecedentePatologico_Guardar") {

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
