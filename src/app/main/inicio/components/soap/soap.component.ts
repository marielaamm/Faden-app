import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IgxComboComponent } from 'igniteui-angular';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { FuncionesGeneralesService } from 'src/app/main/shared/service/funciones-generales.service';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iSistemaSoap } from '../../interface/i-sistema-soap';
import { ExpdienteService } from '../../service/expediente.service';

@Component({
  selector: 'app-soap',
  templateUrl: './soap.component.html',
  styleUrls: ['./soap.component.scss']
})
export class SoapComponent implements OnInit {

  public isLinear = false;
  
  public lstPaciente: any []=[]

  public val: Validacion = new Validacion ();
  
  private _CatalogoService: CatalogoService;
  private _ExpdienteService: ExpdienteService;
  private _FuncionesGenerales: FuncionesGeneralesService;

  @ViewChild('txtPaciente', { static: true })
  public igxComboPaciente: IgxComboComponent;


  public rdTipoAcompanante : Number = 1;
  public rdPropositoVisita : Number = 1;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {
   // [ REGLAS ] 

   this.val.add("txtFecha", "1", "LEN>","0");
   this.val.add("txtHora", "1", "LEN>", "0");   
   this.val.add("txtPaciente","1","LEN>","0");
   this.val.add("txtNoExpediente", "1", "LEN>","0");
   this.val.add("rdTipoAcompanante", "1","LEN>", "0");
   this.val.add("txtNombrecuidador", "1", "LEN>", "0");
   this.val.add("txtDireccion", "1", "LEN>","0");
   this.val.add("txtTelefono", "1", "LEN>","0");
   this.val.add("rdPropositoVisita","1","LEN>","0");
   this.val.add("txtSubjetivo","1","LEN>","0");
   this.val.add("txtObjetivo","1","LEN>","0");
   this.val.add("txtAvaluo","1","LEN>","0");
   this.val.add("txtPlanes","1","LEN>","0");
   
   this._ExpdienteService = new ExpdienteService(this._Dialog);
    this._CatalogoService = new CatalogoService(this._Dialog);
    this._FuncionesGenerales = new FuncionesGeneralesService(this._Dialog);

    this.limpiar();

   }

   public limpiar(){
    this.rdTipoAcompanante = 1;
    this.rdPropositoVisita = 1;
    
    this.val.ValForm.get("txtFecha")?.setValue("");
    this.val.ValForm.get("txtHora")?.setValue("");
    this.val.ValForm.get("txtPaciente")?.setValue("");
    this.val.ValForm.get("txtNoExpediente")?.setValue("");
    this.val.ValForm.get("txtEdad")?.setValue("");
    this.val.ValForm.get("rdTipoAcompanante")?.setValue("");
    this.val.ValForm.get("txtNombrecuidador")?.setValue("");
    this.val.ValForm.get("txtDireccion")?.setValue("");
    this.val.ValForm.get("txtTelefono")?.setValue("");
    this.val.ValForm.get("rdPropositoVisita")?.setValue("");
    this.val.ValForm.get("txtSubjetivo")?.setValue("");
    this.val.ValForm.get("txtObjetivo")?.setValue("");
    this.val.ValForm.get("txtAvaluo")?.setValue("");
    this.val.ValForm.get("txtPlanes")?.setValue("");


    this._ExpdienteService.BuscarPaciente();
    
   }


   private LlenarPaciente(datos: string): void {

    let _json = JSON.parse(datos);

    this.lstPaciente.splice(0, this.lstPaciente.length);

    _json["d"][0].forEach(
      (b: any) => {
        this.lstPaciente.push(b);
      }
    );
        
  
  }

  public Seleccion_Paciente(event: any) {
    if (event.added.length) {
      event.newSelection = event.added;
      let _Fila: any = this.lstPaciente.find(f => f.IdPaciente == event.added);
      this.val.ValForm.get("txtPaciente")?.setValue([_Fila.IdPaciente]);
    }

    this.igxComboPaciente.close();

  }

  public f_key_Enter_Paciente(even: any) {
    if (even.key == "Enter") {
      let _Item: any = this.igxComboPaciente.dropdown;
      this.igxComboPaciente.setSelectedItem([_Item._focusedItem.value.IdPaciente]);
      this.val.ValForm.get("txtPaciente")?.setValue([_Item._focusedItem.value.IdPaciente]);
    }
    this.igxComboPaciente.close();


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

    if(this.val.ValForm.get("txtFecha")?.invalid){
      mensaje += "<li>Indique la Fecha de atención o revise la cantidad de caracteres/li>";
      esError += "1";
    }

    if(this.val.ValForm.get("txtHora")?.invalid){
      mensaje += "<li>Indique la hora de atención o revise la cantidad de caracteres/li>";
      esError += "1";
    }

    if(this.val.ValForm.get("txtPaciente")?.invalid){
      mensaje += "<li>Indique nombre del paciente o revise la cantidad de caracteres/li>";
    esError += "1";
    }

    if(this.val.ValForm.get("txtNoExpediente")?.invalid){
      mensaje += "<li>Indique No de Expediente o revise la cantidad de caracteres/li>";
    esError += "1";
    }


    //[Fin - Validaciones]
    mensaje += "</ol>";

  if (esError.includes("1")) {
    let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + mensaje + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
    let _json = JSON.parse(s);
    this._Dialog.open(DialogoComponent, {

     data: _json["msj"]
    });

  return;
}

  let _filaPaciente: any = this.lstPaciente.find(f => f.IdPaciente == Number(this.val.ValForm.get("txtPaciente")?.value));

  let S: iSistemaSoap = {} as iSistemaSoap;


  S.TipoAcompanante = this.rdTipoAcompanante;
  S.PropositoVisita = this.rdPropositoVisita;
  S.Fecha = this.val.ValForm.get("txtFecha")?.value;
  S.Hora = this.val.ValForm.get("txtHora")?.value;
  S.IdPaciente = _filaPaciente.IdPaciente; // aqui ya se captura el IDPaciente
  S.NoExpediente = this.val.ValForm.get("txtNoExpediente")?.value;
  S.NombreAcompañante = this.val.ValForm.get("txtNombrecuidador")?.value;
  S.Direccion = this.val.ValForm.get("txtDireccion")?.value;
  S.Telefono = this.val.ValForm.get("txtTelefono")?.value;
  S.Subjetivo = this.val.ValForm.get("txtSubjetivo")?.value;
  S.Objetivo = this.val.ValForm.get("txtObjetivo")?.value;
  S.Avaluo = this.val.ValForm.get("txtAvaluo")?.value;
  S.Planes = this.val.ValForm.get("txtPlanes")?.value;

  this._ExpdienteService.GuardarSOAP(S);


  }


  Cerrar() : void{
    
    this.ServerScv.CerrarFormulario();
  }
  
  ngOnInit(): void {

    this.limpiar();
    this._ExpdienteService.change.subscribe(
      s => {

        if (s[0] == "dato_SOAP_Guardar") {

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

        if (s[0] == "Llenar_paciente") {
          this.LlenarPaciente(s[1]);
        }



      }
    );

    this._FuncionesGenerales.change.subscribe(

      s => {
       if (s[0] == "Llenar_FechaServidor") {
          let _json = JSON.parse(s[1]);

          this.val.ValForm.get("txtFecha")?.setValue(_json["d"][0]);

        }
      }
    );


    
  }

}
