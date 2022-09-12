import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {
  public val: Validacion = new Validacion();


  constructor(private ServerScv: ServerService, private _Dialog: MatDialog) {
    this.val.add("txtCodigo", "1", "LEN>", "0");
    this.val.add("txtCodigo", "2", "LEN<=", "4");
    this.val.add("txtDepartamento", "1", "LEN>", "0");
    this.val.add("txtDepartamento", "2", "LEN<=", "50");
    this.limpiar();

  }
  private limpiar(){
    this.val.ValForm.get("txtCodigo")?.setValue("");
    this.val.ValForm.get("txtDepartamento")?.setValue("");

  }
  public v_Guardar(): void {
    let esError: string = " ";
    let mensaje: string = " <ol>";

    if (this.val.ValForm.get("txtCodigo")?.invalid) {
      mensaje += "<li>Ingrese el código del departamento o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtDepartamento")?.invalid) {
      mensaje += "<li>El nombre del departamento no debe exceder 50 caracteres</li>";
      esError += "1";
    }

    mensaje += "</ol>"

    if (esError.includes("1")) {
      let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + mensaje + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
      let _json = JSON.parse(s);
      this._Dialog.open(DialogoComponent, {

        data: _json["msj"]
      });

      return;

    }

  }


  Cerrar(): void {

    this.ServerScv.CerrarFormulario();

  }
  ngOnInit(): void {

    this.ServerScv.change.subscribe(s => {

      if (s instanceof Array) {
        if (s[0] == "DatosModal" && s[1] == "modal-registro-departamento") {
          console.log(s[2]);
        }
      }

      if (s[0] == "dato_Departamento_Guardar") {

        this.val.ValForm.enable();

        if (s[1] == undefined) {

          let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + "error al guardar" + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
          let _json = JSON.parse(s);
          this._Dialog.open(DialogoComponent, {
            data: _json["msj"]
          });
          return;
        }
        this.limpiar();

      }
    });

  }



}
