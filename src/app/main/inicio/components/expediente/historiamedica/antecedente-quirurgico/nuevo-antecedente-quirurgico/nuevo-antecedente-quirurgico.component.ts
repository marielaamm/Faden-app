import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iAntecedenteQuirurgico } from 'src/app/main/inicio/interface/i-antecedente-quirurgico';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { FuncionesGeneralesService } from 'src/app/main/shared/service/funciones-generales.service';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-nuevo-antecedente-quirurgico',
  templateUrl: './nuevo-antecedente-quirurgico.component.html',
  styleUrls: ['./nuevo-antecedente-quirurgico.component.scss']
})
export class NuevoAntecedenteQuirurgicoComponent implements OnInit {

  public val: Validacion = new Validacion ();
  public IdPaciente : Number = 0;
  public ID : Number = 0;

  
  private _FuncionesGenerales: FuncionesGeneralesService;

 
  
  constructor(private ServerScv: ServerService, private _Dialog: MatDialog, private _ExpdienteService: ExpdienteService) { 

    this.val.add("txtDescripcion", "1", "LEN>", "0");
    this.val.add("txtDescripcion", "2", "LEN<=", "50");
    this.val.add("txtLugar", "1", "LEN>", "0");
    this.val.add("txtLugar", "2", "LEN<=", "50");
    this.val.add("txtFecha", "1", "LEN>=", "0");



    this._FuncionesGenerales = new FuncionesGeneralesService(this._Dialog);

    this.Limpiar();
    
  }

  public Limpiar()
  {

    this.ID = 0;
    this.val.ValForm.get("txtDescripcion")?.setValue("");
    this.val.ValForm.get("txtLugar")?.setValue("");

    this._FuncionesGenerales.FechaServidor();
  }



  Cerrar(): void {

    this.ServerScv.change.emit(["CerrarDialog","frmAntecedenteQuirurgico", ""]);

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
    
   

    let E: iAntecedenteQuirurgico = {}as iAntecedenteQuirurgico;
    E.IdAntQ = this.ID;
    E.Descripcion  = this.val.ValForm.get("txtDescripcion")?.value;
    E.Lugar  = this.val.ValForm.get("txtLugar")?.value;
    E.Fecha =   new Date((JSON.stringify(this.val.ValForm.get("txtFecha")?.value)).substring(1, 11));
    E.IdPaciente = this.IdPaciente;
    this._ExpdienteService.GuardarAntecedenteQuirurgico(E);

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

        if (s[0] == "dato_Antecedente_Quirurgico_Guardar") {

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
