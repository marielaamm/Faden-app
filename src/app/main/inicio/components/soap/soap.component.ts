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
import { Funciones } from 'src/app/main/shared/class/cls_Funciones';

@Component({
  selector: 'app-soap',
  templateUrl: './soap.component.html',
  styleUrls: ['./soap.component.scss']
})
export class SoapComponent implements OnInit {

  public isLinear = false;
  
  public lstPaciente: any []=[]
  private lstDatosAcomp : any []=[]
  public lstAcompanante : any []=[]
  private FechaServidor : Date;

  public val: Validacion = new Validacion ();
  
  private _CatalogoService: CatalogoService;
  private _ExpdienteService: ExpdienteService;
  private _FuncionesGenerales: FuncionesGeneralesService;

  @ViewChild('txtPaciente', { static: true })
  public igxComboPaciente: IgxComboComponent;


  public rdTipoAcompanante : Number = 1;
  public rdPropositoVisita : Number = 1;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog, private cFunciones : Funciones) {
   // [ REGLAS ] 

   this.val.add("txtFecha", "1", "LEN>","0");  
   this.val.add("txtPaciente","1","LEN>","0");
   this.val.add("txtNoExpediente", "1", "LEN>","0");
   this.val.add("txtEdad", "1","LEN>", "0");
   this.val.add("cmbAcompanante", "1","LEN>", "0");
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
    this._FuncionesGenerales.FechaServidor();

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
    this.val.ValForm.get("txtDireccion")?.setValue("");
    this.val.ValForm.get("txtTelefono")?.setValue("");
    this.val.ValForm.get("rdPropositoVisita")?.setValue("");
    this.val.ValForm.get("txtSubjetivo")?.setValue("");
    this.val.ValForm.get("txtObjetivo")?.setValue("");
    this.val.ValForm.get("txtAvaluo")?.setValue("");
    this.val.ValForm.get("txtPlanes")?.setValue("");

    this.val.ValForm.get("txtFecha")?.disable();
    this.val.ValForm.get("txtEdad")?.disable();
    this.val.ValForm.get("txtNoExpediente")?.disable();

    this._FuncionesGenerales.FechaServidor();
    this._ExpdienteService.BuscarPaciente();
    
   }


   private LlenarPaciente(datos: string): void {

    
    let _json = JSON.parse(datos);

    this.lstPaciente.splice(0, this.lstPaciente.length);
    this.lstPaciente = _json["d"][0];
    this.lstDatosAcomp = _json["d"][1];

  }

  public Seleccion_Paciente(event: any) {

    this.lstAcompanante.splice(0, this.lstAcompanante.length);
    this.cmbAcompanante.deselectAllItems();
    this.val.ValForm.get("cmbAcompanante")?.setValue("");
    this.val.ValForm.get("txtEdad")?.setValue("0");

    if (event.added.length) {
      event.newSelection = event.added;
      let _Fila: any = this.lstPaciente.find(f => f.IdPaciente == event.added);
      this.val.ValForm.get("txtPaciente")?.setValue([_Fila.IdPaciente]);
      this.val.ValForm.get("txtNoExpediente")?.setValue(_Fila.NoExpediente);

      this.lstAcompanante = this.lstDatosAcomp.filter(f => f.IdPaciente ==_Fila.IdPaciente)
      this.val.ValForm.get("txtEdad")?.setValue(this.FechaServidor.getFullYear() - (new Date(_Fila.FechaNacim)).getFullYear());
      

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



  @ViewChild("cmbAcompanante", { static: false })
  public cmbAcompanante: IgxComboComponent;
  
  public v_Select_AcomPanante(event: any): void {


    if (event.added.length) {
      event.newSelection = event.added;

      let cmb : any = this.cmbAcompanante.dropdown;
      let _Item: any = cmb._focusedItem.value;


      this.val.ValForm.get("cmbAcompanante")?.setValue([_Item.Codigo]);
      this.val.ValForm.get("txtDireccion")?.setValue(_Item.Direccion);
      this.val.ValForm.get("txtTelefono")?.setValue(_Item.Telefono);
      this.rdTipoAcompanante = 1;
       if(_Item.EsAcpte) this.rdTipoAcompanante = 0

      
    }



  }


  public v_Enter_AcomPanante(event: any) {
    if (event.key == "Enter") {
      let cmb: any = this.cmbAcompanante.dropdown;
      let _Item: any = cmb._focusedItem.value;
      this.cmbAcompanante.select([_Item.IdAcpte]);
      
    }
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

 
    if(this.val.ValForm.get("txtPaciente")?.invalid){
      mensaje += "<li>Indique nombre del paciente o revise la cantidad de caracteres/li>";
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

  let cmb : any = this.cmbAcompanante.dropdown;
  let _Item: any = cmb._focusedItem.value;


  S.TipoAcompanante = this.rdTipoAcompanante;
  S.PropositoVisita = this.rdPropositoVisita;
  S.Fecha = this.val.ValForm.get("txtFecha")?.value;
  S.IdPaciente = _filaPaciente.IdPaciente; // aqui ya se captura el IDPaciente
  S.NombreAcompanante = _Item.NombreCompleto;
  S.Direccion = this.val.ValForm.get("txtDireccion")?.value;
  S.Telefono = this.val.ValForm.get("txtTelefono")?.value;
  S.Subjetivo = this.val.ValForm.get("txtSubjetivo")?.value;
  S.Objetivo = this.val.ValForm.get("txtObjetivo")?.value;
  S.Avaluo = this.val.ValForm.get("txtAvaluo")?.value;
  S.Planes = this.val.ValForm.get("txtPlanes")?.value;
  S.Usuario = this.cFunciones.User;

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

          this.FechaServidor = new Date(_json["d"][0])
          this.val.ValForm.get("txtFecha")?.setValue(this.cFunciones.DateFormat(this.FechaServidor, "yyyy-MM-dd"));

        }
      }
    );


    
  }

}
