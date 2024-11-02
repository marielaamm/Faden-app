import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { ExpdienteService } from '../../../service/expediente.service';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { iHistoriaFamSoc } from '../../../interface/i-historia-familiar-social';
import { iDatosExpediente } from '../../../interface/i-datos-expediente';

@Component({
  selector: 'app-historiamedica',
  templateUrl: './historiamedica.component.html',
  styleUrls: ['./historiamedica.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoriamedicaComponent implements OnInit {

  public lstPaciente:{}[]=[];
  public isLinear = false;
  public val: Validacion = new Validacion();
  
  private _CatalogoService: CatalogoService;  
  public IdPaciente : Number = 0;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog, private _ExpdienteService: ExpdienteService) { 

    //***REGLAS*** */
  this.val.add("txtFamiliar","1", "LEN>","0");
  this.val.add("txtSocial","1", "LEN>","0");



  this.limpiar();

  }

  public limpiar(){

    this.val.ValForm.get("txtFamiliar")?.setValue("");
    this.val.ValForm.get("txtSocial")?.setValue("");


    this._CatalogoService = new CatalogoService(this._Dialog);
  }


  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

public Guardar(){

  let esError: string = " ";
  let mensaje: string = "<ol>";

   //[Inicio - Validaciones]

   if (this.val.ValForm.get("txtFamiliar")?.invalid) {
    mensaje += "<li>Describa la historia familiar o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtSocial")?.invalid) {
    mensaje += "<li>Describa la historia social o revise la cantidad de caracteres</li>";
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

let H: iHistoriaFamSoc = {} as iHistoriaFamSoc;

H.IdPaciente = this.IdPaciente;
H.HistoriaFamiliar = this.val.ValForm.get("txtFamiliar")?.value;
H.HistoriaSocial = this.val.ValForm.get("txtSocial")?.value;

this._ExpdienteService.GuardarHistoriaMedSoc(H);

}

private LlenarHistoriaFamSoc(datos : any)
{
  let _json = JSON.parse(datos);

  
    let d : iDatosExpediente =  _json["d"];


  let H: iHistoriaFamSoc  =   JSON.parse(d.HistoriaFamSoc)[0];
     
  if(H != undefined)
  {
    this.val.ValForm.get("txtFamiliar")?.setValue(H.HistoriaFamiliar);
    this.val.ValForm.get("txtSocial")?.setValue(H.HistoriaSocial);
    
  }
  
}

Cerrar() : void{
    
  this.ServerScv.CerrarFormulario();
}

  ngOnInit(): void {

    
    this.limpiar();

    this.ServerScv.change.subscribe(s => {
      if(s[0] == "Menu Expediente"){
        this.IdPaciente =  s[1];
    
      }
    });

    this._ExpdienteService.change.subscribe(

      s => {

        if (s[0] == "dato_Historia_Guardar") {

          this.val.ValForm.enable();

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
  
          this.val.ValForm.get("txtNoExpediente")?.setValue(s[1]["d"].NoExpediente);
          this.val.ValForm.get("txtNoExpediente")?.disable();
        }
        console.log(s[1])
        if(s[0] == "Llenar_Datos_Paciente") this.LlenarHistoriaFamSoc(s[1] );



      }
    );

    this.ServerScv.change.subscribe(s => {

      if(s[0] == "Menu Expediente") this.IdPaciente =  s[1];
      if(s[0] == "Cerrar Expediente") {
        this.IdPaciente = 0
        this.limpiar();
      }
    });

  }

}
