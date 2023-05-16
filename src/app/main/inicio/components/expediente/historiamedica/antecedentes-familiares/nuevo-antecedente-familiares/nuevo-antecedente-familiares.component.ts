import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iAntecedentesFamiliares } from 'src/app/main/inicio/interface/i-antecedentes-familiares';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-nuevo-antecedente-familiares',
  templateUrl: './nuevo-antecedente-familiares.component.html',
  styleUrls: ['./nuevo-antecedente-familiares.component.scss']
})
export class NuevoAntecedenteFamiliaresComponent implements OnInit {
  public val: Validacion = new Validacion ();
  public IdPaciente : Number = 0;
  public ID : Number = 0;

  

  
  constructor(private ServerScv: ServerService, private _Dialog: MatDialog, private _ExpdienteService: ExpdienteService) { 

    this.val.add("txtTipoAntecedente", "1", "LEN>", "0");
    this.val.add("txtTipoAntecedente", "2", "LEN<=", "100");
    this.val.add("txtDescripcion", "1", "LEN>", "0");
    this.val.add("txtDescripcion", "2", "LEN<=", "4000");

 
    this.Limpiar();
    
  }

  public Limpiar()
  {
    this.val.ValForm.get("txtTipoAntecedente")?.setValue("");
    this.val.ValForm.get("txtDescripcion")?.setValue("");

    this.ID = 0;
  }


  Cerrar(): void {

    this.ServerScv.change.emit(["CerrarDialog","frmAntFamiliar", ""]);

  }

  public v_Guardar(){

    let esError: string = "";
    let mensaje: string = "<ol>";

    if (this.val.ValForm.get("txtTipoAntecedente")?.invalid) {
      mensaje += "<li>Ingrese un antecedente o revise la cantidada de caracteres.</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtDescripcion")?.invalid) {
      mensaje += "<li>Ingrese una descripcion o revise la cantidada de caracteres.</li>";
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
    
   
    let T: iAntecedentesFamiliares = {}as iAntecedentesFamiliares;
    T.TipoAntecedente = this.val.ValForm.get("txtTipoAntecedente")?.value;
    T.Descripcion = this.val.ValForm.get("txtDescripcion")?.value;
    T.IdPaciente = this.IdPaciente;
    T.IdAntecedente = this.ID;
    this._ExpdienteService.GuardarAntFamiliar(T);

  }

  ngOnInit(): void {

 
    
    this._ExpdienteService.change.subscribe(

      s => {

        if (s[0] == "dato_Ant_Familiar_Guardar") {

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
