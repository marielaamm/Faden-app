import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iEscolaridad } from '../../interface/i-escolaridad';
import { CatalogoService } from '../../service/catalogo.service';


@Component({
  selector: 'app-escolaridad',
  templateUrl: './escolaridad.component.html',
  styleUrls: ['./escolaridad.component.scss']
})
export class EscolaridadComponent implements OnInit {

  private _CatalogoService:CatalogoService;
  public val: Validacion = new Validacion();

    constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {
      this.val.add("txtEscolaridad", "1", "LEN>", "0");
      this.Limpiar();

      this._CatalogoService = new CatalogoService(this._Dialog);
     }

     public Limpiar(){
      this.val.ValForm.get("txtEscolaridad")?.setValue("");
     }

     public Guardar(): void {
      let esError: string = " ";
      let mensaje: string = " <ol>";

     if (this.val.ValForm.get("txtEscolaridad")?.invalid) {
      mensaje += "<li>Ingrese la Escolaridad</li>";
      esError += "1";
    }

    mensaje += "</ol>"

    if (esError.includes("1")) {
      let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Guardar\":\"" + 1 + "\",\"Mensaje\":\"" + mensaje + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
      let _json = JSON.parse(s);
      this._Dialog.open(DialogoComponent, {

        data: _json["msj"]
      });

      return;

    }

    let E: iEscolaridad = {}as  iEscolaridad;

    E.IdEscolaridad = 0;
    E.Escolaridad = this.val.ValForm.get("txtEscolaridad")?.value;
    this._CatalogoService.GuardarEscolaridad(E);
    


     }

    Cerrar() : void{
    
        this.ServerScv.CerrarFormulario();
      
  }


  ngOnInit(): void {

    this.ServerScv.change.subscribe(s =>{

      if(s instanceof Array){
        if(s[0] == "DatosModal" && s[1] == "modal-registro-escolaridad" ) {
          console.log(s[2]);
        }
      }

    });

  }

}
