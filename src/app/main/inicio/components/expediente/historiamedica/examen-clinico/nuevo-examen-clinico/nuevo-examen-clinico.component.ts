import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iExamenClinico } from 'src/app/main/inicio/interface/i-examen-clinico';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { FuncionesGeneralesService } from 'src/app/main/shared/service/funciones-generales.service';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-nuevo-examen-clinico',
  templateUrl: './nuevo-examen-clinico.component.html',
  styleUrls: ['./nuevo-examen-clinico.component.scss']
})
export class NuevoExamenClinicoComponent implements OnInit {

  public val: Validacion = new Validacion ();
  public rdTipo : Number = 1;
  public IdPaciente : Number = 0;

  private _ExpdienteService: ExpdienteService;
  private _FuncionesGenerales: FuncionesGeneralesService;
  
  constructor(private ServerScv: ServerService, private _Dialog: MatDialog) { 

    this.val.add("txtDescripcion", "1", "LEN>", "0");
    this.val.add("txtDescripcion", "2", "LEN<=", "500");
    this.val.add("txtFecha", "1", "LEN>", "0");
    this.val.add("rdTipo", "1", "LEN>=", "0");

    this._ExpdienteService = new ExpdienteService(this._Dialog);
    this._FuncionesGenerales = new FuncionesGeneralesService(this._Dialog);
    
    this.Limpiar();
    
  }

  public Limpiar()
  {
    this.rdTipo = 1;
    this.val.ValForm.get("txtDescripcion")?.setValue("");
    this.val.ValForm.get("txtFecha")?.setValue("");

    this._FuncionesGenerales.FechaServidor();
  }


  Cerrar(): void {

    this.ServerScv.change.emit(["CerrarDialog","frmExamenClinico", ""]);

  }

  public v_Guardar(){

    let esError: string = "";
    let mensaje: string = "<ol>";

    if (this.val.ValForm.get("txtDescripcion")?.invalid) {
      mensaje += "<li>Ingrese una descripcion o revise la cantidada de caracteres.</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtF<echa")?.invalid) {
      mensaje += "<li>Seleccione una frecha.</li>";
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
    
   
    let T: iExamenClinico = {}as iExamenClinico;
    T.Descripción = this.val.ValForm.get("txtDescripcion")?.value;
    T.Fecha  = new Date((JSON.stringify(this.val.ValForm.get("txtFecha")?.value)).substring(1, 11));
    T.IdPaciente = this.IdPaciente;
    T.TipoExamen = this.rdTipo;
    this._ExpdienteService.GuardarExamenClinico(T);

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

        if (s[0] == "dato_Examen_Clinico_Guardar") {

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
