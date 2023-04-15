import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iPresuncion } from 'src/app/main/inicio/interface/i-presuncion';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { FuncionesGeneralesService } from 'src/app/main/shared/service/funciones-generales.service';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-nuevo-analisis-presuncion',
  templateUrl: './nuevo-analisis-presuncion.component.html',
  styleUrls: ['./nuevo-analisis-presuncion.component.scss']
})
export class NuevoAnalisisPresuncionComponent implements OnInit {

  public val: Validacion = new Validacion ();
  public IdPaciente : Number = 0;
  public ID : Number = 0;

  private _ExpdienteService: ExpdienteService;
  private _FuncionesGenerales: FuncionesGeneralesService;

 
  
  constructor(private ServerScv: ServerService, private _Dialog: MatDialog) { 

    this.val.add("txtDescripcion", "1", "LEN>", "0");
    this.val.add("txtDescripcion", "2", "LEN<=", "500");
    this.val.add("txtFecha", "1", "LEN>=", "0");


    this._ExpdienteService = new ExpdienteService(this._Dialog);
    this._FuncionesGenerales = new FuncionesGeneralesService(this._Dialog);

    this.Limpiar();
    
  }

  public Limpiar()
  {

    this.ID = 0;
    this.val.ValForm.get("txtDescripcion")?.setValue("");

    this._FuncionesGenerales.FechaServidor();
  }



  Cerrar(): void {

    this.ServerScv.change.emit(["CerrarDialog","frmAntPresuncion", ""]);

  }

  public v_Guardar(){

    let esError: string = "";
    let mensaje: string = "<ol>";

    if (this.val.ValForm.get("txtDescripcion")?.invalid) {
      mensaje += "<li>Ingrese una descripcion o revise la cantidada de caracteres</li>";
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
    
   

    let E: iPresuncion = {}as iPresuncion;
    E.IdAnalisiPresuncion = this.ID;
    E.Descripcion  = this.val.ValForm.get("txtDescripcion")?.value;
    E.Fecha =   new Date((JSON.stringify(this.val.ValForm.get("txtFecha")?.value)).substring(1, 11));
    E.IdPaciente = this.IdPaciente;
    this._ExpdienteService.GuardarAntPresuncion(E);

  }

  

  ngOnInit(): void {


    this._FuncionesGenerales.change.subscribe(

      s => {

        if (s[0] == "Llenar_FechaServidor") {
          let _json = JSON.parse(s[1]);

          this.val.ValForm.get("txtFecha")?.setValue(_json["d"][0]);

        }
      }
    );


    this._ExpdienteService.change.subscribe(

      s => {

        if (s[0] == "dato_Ant_Presuncion_Guardar") {

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
