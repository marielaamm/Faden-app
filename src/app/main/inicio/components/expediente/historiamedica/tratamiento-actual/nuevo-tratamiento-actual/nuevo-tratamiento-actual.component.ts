import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iTratamientoActual } from 'src/app/main/inicio/interface/i-tratamiento-actual';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
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
  public rdTipoTratammiento : string = "1";
  private IdPaciente : Number = 0;

  private _ExpdienteService: ExpdienteService;
  
  constructor(private ServerScv: ServerService, private _Dialog: MatDialog) { 

    this.val.add("txtTratamiento", "1", "LEN>", "0");
    this.val.add("txtTratamiento", "2", "LEN<=", "50");
    this.val.add("txtDosis", "1", "LEN>", "0");
    this.val.add("txtDosis", "2", "LEN<=", "50");
    this.val.add("rdTipoTratammiento", "1", "LEN>=", "0");


    
  }

  public Limpiar()
  {
    this.rdTipoTratammiento = "1";
    this.val.ValForm.get("txtTratamiento")?.setValue("");
    this.val.ValForm.get("txtDosis")?.setValue("");

    this._ExpdienteService = new ExpdienteService(this._Dialog);
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
    T.Tratamiento = this.val.ValForm.get("txtTratamiento")?.value;
    T.Dosis  = this.val.ValForm.get("txtDosis")?.value;
    T.IdMedico = 14;
    T.IdPaciente = this.IdPaciente;
    T.TipoTratamiento = this.rdTipoTratammiento;
    this._ExpdienteService.GuardarTratamiento(T);

  }

  ngOnInit(): void {

    this.ServerScv.change.subscribe(s => {

      if(s[0] == "Menu Expediente") this.IdPaciente =  s[1];
      if(s[0] == "Cerrar Expediente") this.IdPaciente = 0

    });
    
  }

}
