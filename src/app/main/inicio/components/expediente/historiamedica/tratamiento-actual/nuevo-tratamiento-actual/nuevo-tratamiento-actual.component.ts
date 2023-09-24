import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iTratamientoActual } from 'src/app/main/inicio/interface/i-tratamiento-actual';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { Funciones } from 'src/app/main/shared/class/cls_Funciones';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-nuevo-tratamiento-actual',
  templateUrl: './nuevo-tratamiento-actual.component.html',
  styleUrls: ['./nuevo-tratamiento-actual.component.scss']
})
export class NuevoTratamientoActualComponent implements OnInit {

  public val: Validacion = new Validacion ();
  public rdTipoTratammiento : Number = 1;
  public IdPaciente : Number = 0;
  public ID : Number = 0;

  
  
  constructor(private ServerScv: ServerService, private _Dialog: MatDialog, private _ExpdienteService: ExpdienteService, private cFunciones : Funciones) { 

    this.val.add("txtTratamiento", "1", "LEN>", "0");
    this.val.add("txtTratamiento", "2", "LEN<=", "50");
    this.val.add("txtDosis", "1", "LEN>", "0");
    this.val.add("txtDosis", "2", "LEN<=", "50");
    this.val.add("rdTipoTratammiento", "1", "LEN>=", "0");

    
    this.Limpiar();
    
  }

  public Limpiar()
  {
    this.ID = 0;
    this.rdTipoTratammiento = 1;
    this.val.ValForm.get("txtTratamiento")?.setValue("");
    this.val.ValForm.get("txtDosis")?.setValue("");

   
  }


  Cerrar(): void {

    this.ServerScv.change.emit(["CerrarDialog","frmTratamientoActual", ""]);

  }

  public v_Guardar(){

    let esError: string = "";
    let mensaje: string = "<ol>";

    if (this.val.ValForm.get("txtTratamiento")?.invalid) {
      mensaje += "<li>Ingrese el nombre del tratamiento o revise la cantidada de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtDosis")?.invalid) {
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
    
   
    let T: iTratamientoActual = {}as iTratamientoActual;
    T.IdTratamiento = this.ID;
    T.Tratamiento = this.val.ValForm.get("txtTratamiento")?.value;
    T.Dosis  = this.val.ValForm.get("txtDosis")?.value;
    T.IdMedico = this.cFunciones.IdMedico;
    T.IdPaciente = this.IdPaciente;
    T.Tipo = this.rdTipoTratammiento;
    this._ExpdienteService.GuardarTratamiento(T);

  }

  ngOnInit(): void {

 
    this._ExpdienteService.change.subscribe(

      s => {

        if (s[0] == "dato_Tratamiento_Guardar") {

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
