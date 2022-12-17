import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IgxComboComponent } from 'igniteui-angular';
import { iMunicipio } from 'src/app/main/cat/interface/i-municipio';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { iLugarNac } from 'src/app/main/shared/interface/i-lugarnac';
import { FuncionesGeneralesService } from 'src/app/main/shared/service/funciones-generales.service';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iPaciente } from '../../../interface/i-paciente';
import { AcompananteComponent } from './acompanante/acompanante.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})

export class PacienteComponent implements OnInit {

  @ViewChild('Acompanante', {static : true})
  public Acompanante: AcompananteComponent;

  public lstMunicipio:  iLugarNac[] = [];
  public lstEscolaridad:{}[]=[];
  public val: Validacion = new Validacion();
  private _CatalogoService: CatalogoService;
  private _FuncionesGenerales: FuncionesGeneralesService;
 
  private _Fila_Paciente : any = undefined;
  private esDialog : boolean = false;
  @Output() change: EventEmitter<any> = new EventEmitter();
  
  @ViewChild('txtMunicipio', { static: true })
  public igxComboMunicipio: IgxComboComponent;
 


  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {

    this.val.add("txtNoExpediente", "1", "LEN>=", "0");
    this.val.add("txtFecha", "1", "LEN>=", "0");
    this.val.add("txtPrimerNombre", "1", "LEN>","0");
    this.val.add("txtSegundoNombre", "1", "LEN>", "0");
    this.val.add("txtPrimerApellido", "1", "LEN>","0");
    this.val.add("txtSegundoApellido", "1", "LEN>", "0");
    this.val.add("txtMunicipio", "1", "LEN>=", "0");
    this.val.add("txtFechaNacimiento", "1", "LEN>=", "0");
    this.val.add("txtEdad","1", "LEN>", "0");
    this.val.add("txtOcupacion","1", "LEN>", "0");
    this.val.add("txtCedula","1", "LEN>", "0");
    this.val.add("txtEscolaridad","1", "LEN>=", "0");
    this.val.add("txtEstadoCivil","1", "LEN>", "0");
    this.val.add("txtDireccion","1", "LEN>", "0");
    this.val.add("txtTelefono","1", "LEN>", "0");
    this.val.add("txtCelular","1", "LEN>", "0");
    this.val.add("txtCorreo","1", "LEN>", "0");
    this.val.add("txtReligion","1", "LEN>", "0");

    this.val.add("chkSolo","1", "LEN>=", "0");
    this.val.add("chkHijo","1", "LEN>=", "0");
    this.val.add("chkNieto","1", "LEN>=", "0");
    this.val.add("chkPareja","1", "LEN>=", "0");
    this.val.add("chkHermano","1", "LEN>=", "0");
    this.val.add("chkAmigo","1", "LEN>=", "0");

    this.val.add("chkEsp","1", "LEN>=", "0");
    this.val.add("chkRef","1", "LEN>=", "0");
    this.val.add("chkReco","1", "LEN>=", "0");
    this.val.add("chkMedios","1", "LEN>=", "0");

    this.val.add("chkFB","1", "LEN>=", "0");
    this.val.add("chkInst","1", "LEN>=", "0");
    this.val.add("chkTwi","1", "LEN>=", "0");
    this.val.add("chkTransf","1", "LEN>=", "0");
    this.val.add("chkOtros","1", "LEN>=", "0");
    this.val.add("txtRefOtros","1", "LEN>=", "0");


    

    this.val.add("chkTrabAct","1", "LEN>=", "0");
    this.val.add("txtRefTrab","1", "LEN>=","0");


    this.val.add("chkUltTrab","1", "LEN>=", "0");
    this.val.add("txtRefUltTrab","1", "LEN>=", "0");


    this.val.add("chkjubilado","1", "LEN>=", "0");
    this.val.add("chkpension","1", "LEN>=", "0");
    
    this.val.add("rdSexo","1", "NUM>", "0");
 
    this.limpiar();
    
    this._CatalogoService = new CatalogoService(this._Dialog);
    this._FuncionesGenerales = new FuncionesGeneralesService(this._Dialog);
    this._FuncionesGenerales.BuscarFechaNac();

   }

   public limpiar(){
    this.val.ValForm.get("txtNoExpediente")?.setValue("");
    this.val.ValForm.get("txtFecha")?.setValue("");
    this.val.ValForm.get("txtPrimerNombre")?.setValue("");
    this.val.ValForm.get("txtSegundoNombre")?.setValue("");
    this.val.ValForm.get("txtPrimerApellido")?.setValue("");
    this.val.ValForm.get("txtSegundoApellido")?.setValue("");
    this.val.ValForm.get("txtMunicipio")?.setValue("");
    this.val.ValForm.get("txtFechaNacimiento")?.setValue("");
    this.val.ValForm.get("txtEdad")?.setValue("");
    this.val.ValForm.get("txtOcupacion")?.setValue("");
    this.val.ValForm.get("txtCedula")?.setValue("");
    this.val.ValForm.get("txtEscolaridad")?.setValue("");
    this.val.ValForm.get("txtEstadoCivil")?.setValue("");
    this.val.ValForm.get("txtDireccion")?.setValue("");
    this.val.ValForm.get("txtTelefono")?.setValue("");
    this.val.ValForm.get("txtCelular")?.setValue("");
    this.val.ValForm.get("txtCorreo")?.setValue("");
    this.val.ValForm.get("txtReligion")?.setValue("");

    this.val.ValForm.get("chkSolo")?.setValue("");
    this.val.ValForm.get("chkHijo")?.setValue("");
    this.val.ValForm.get("chkNieto")?.setValue("");
    this.val.ValForm.get("chkPareja")?.setValue("");
    this.val.ValForm.get("chkHermano")?.setValue("");
    this.val.ValForm.get("chkAmigo")?.setValue("");

    this.val.ValForm.get("chkEsp")?.setValue("");
    this.val.ValForm.get("chkRef")?.setValue("");
    this.val.ValForm.get("chkReco")?.setValue("");
    this.val.ValForm.get("chkMedios")?.setValue("");

    this.val.ValForm.get("chkFB")?.setValue("");
    this.val.ValForm.get("chkInst")?.setValue("");
    this.val.ValForm.get("chkTwi")?.setValue("");
    this.val.ValForm.get("chkTransf")?.setValue("");


    this.val.ValForm.get("chkOtros")?.setValue(false);
    this.val.ValForm.get("txtRefOtros")?.setValue("");
    this.val.ValForm.get("txtRefOtros")?.disable();


   
    this.val.ValForm.get("chkTrabAct")?.setValue(false);
    this.val.ValForm.get("txtRefTrab")?.setValue("");    
    this.val.ValForm.get("txtRefTrab")?.disable();


    this.val.ValForm.get("chkUltTrab")?.setValue(false);
    this.val.ValForm.get("txtRefUltTrab")?.setValue("");
    this.val.ValForm.get("txtRefUltTrab")?.disable();



    this.val.ValForm.get("chkjubilado")?.setValue("");
    this.val.ValForm.get("chkpension")?.setValue("");


    this.val.ValForm.get("rdSexo")?.setValue("");

    this.val.ValForm.get("txtNoExpediente")?.disable();
    this.EditarPaciente(this._Fila_Paciente);
    
   }

   public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

//***************************VISITA********************************/

public f_RefOtros() : void {

  this.val.ValForm.get("txtRefOtros")?.disable();

  if(this.val.ValForm.get("chkOtros")?.value == true)
  {
    this.val.ValForm.get("txtRefOtros")?.enable();
  }
}

//****************************************************************/

//*****************REFERENCIA TRABAJO *****************/

public f_RefTrab() : void {

  this.val.ValForm.get("txtRefTrab")?.disable();

  if(this.val.ValForm.get("chkTrabAct")?.value == true)
  {
    this.val.ValForm.get("txtRefTrab")?.enable();
  }
}
//*************************************************** */

//***************** REF ULTIMO TRABAJO***** */

public f_UltimoTrab() : void {
  this.val.ValForm.get("txtRefUltTrab")?.disable();

  if(this.val.ValForm.get("chkUltTrab")?.value == true)
  {
    this.val.ValForm.get("txtRefUltTrab")?.enable();
  }

}

//**************************************** */

public Guardar(){


  let esError: string = " ";
  let mensaje: string = "<ol>";

  if (this.val.ValForm.get("txtPrimerNombre")?.invalid) {
    mensaje += "<li>Ingrese el primer nombre o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtSegundoNombre")?.invalid) {
    mensaje += "<li>Ingrese sel segundo nombre o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtPrimerApellido")?.invalid) {
    mensaje += "<li>Ingrese el primer apellido o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtSegundoApellido")?.invalid) {
    mensaje += "<li>Ingrese el segundo apellido o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtMunicipio")?.invalid) {
   mensaje += "<li>Ingrese lugar de nacimiento o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtFechaNacimiento")?.invalid) {
    mensaje += "<li>Ingrese fecha de nacimiento o revise la cantidad de caracteres</li>";
    esError += "1";
  }
  
  if (this.val.ValForm.get("txtOcupacion")?.invalid) {
    mensaje += "<li>Ingrese ocupación del paciente o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtCedula")?.invalid) {
    mensaje += "<li>Digite la cédula del paciente o revise la cantidad de caracteres</li>";
    esError += "1";
  }

 if (this.val.ValForm.get("txtEscolaridad")?.invalid) {
    mensaje += "<li>Digite nivel de escolaridad o revise la cantidad de caracteres</li>";
   esError += "1";
  }

  if (this.val.ValForm.get("txtEstadoCivil")?.invalid) {
    mensaje += "<li>Digite estado civil o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtDireccion")?.invalid) {
    mensaje += "<li>Digite la dirección paciente o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtTelefono")?.invalid) {
    mensaje += "<li>Digite telefono fijo o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtCelular")?.invalid) {
    mensaje += "<li>Digite telefono celular o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtCorreo")?.invalid) {
    mensaje += "<li>Digite correo electrónico o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtReligion")?.invalid) {
    mensaje += "<li>Digite la religión o revise la cantidad de caracteres</li>";
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

  let _filalugar: any= this.lstMunicipio.find(f => f.IdLugarNac == String(this.val.ValForm.get("txtMunicipio")?.value));

  let Convivencia : string = "";

  Convivencia += Number(this.val.ValForm.get("chkSolo")?.value);
  Convivencia += Number(this.val.ValForm.get("chkHijo")?.value);
  Convivencia += Number(this.val.ValForm.get("chkNieto")?.value);
  Convivencia += Number(this.val.ValForm.get("chkPareja")?.value);
  Convivencia += Number(this.val.ValForm.get("chkHermano")?.value);
  Convivencia += Number(this.val.ValForm.get("chkAmigo")?.value);
  

  let Visitar : string = "";

  Visitar += Number(this.val.ValForm.get("chkEsp")?.value);
  Visitar += Number(this.val.ValForm.get("chkRef")?.value);
  Visitar += Number(this.val.ValForm.get("chkReco")?.value);
  Visitar += Number(this.val.ValForm.get("chkMedios")?.value);

  let ReferVis : string = "";

  ReferVis += Number(this.val.ValForm.get("chkFB")?.value);
  ReferVis += Number(this.val.ValForm.get("chkInst")?.value);
  ReferVis += Number(this.val.ValForm.get("chkTwi")?.value);
  ReferVis += Number(this.val.ValForm.get("chkTransf")?.value);
  ReferVis += Number(this.val.ValForm.get("chkOtros")?.value);

  let AntLab : string = "";
  AntLab += Number(this.val.ValForm.get("chkTrabAct")?.value)+ ";";
  AntLab += Number(this.val.ValForm.get("chkUltTrab")?.value)+ ";";
  AntLab += Number(this.val.ValForm.get("chkjubilado")?.value)+";";
  AntLab += Number(this.val.ValForm.get("chkpension")?.value);

  


  let P: iPaciente = {}as iPaciente;

  P.IdPaciente = 0;
  P.NoExpediente= this.val.ValForm.get("txtNoExpediente")?.value;
  P.FechaIngreso = this.val.ValForm.get("txtFecha")?.value;
  P.PNombre = this.val.ValForm.get("txtPrimerNombre")?.value;
  P.SNombre = this.val.ValForm.get("txtSegundoNombre")?.value;
  P.PApellido = this.val.ValForm.get("txtPrimerApellido")?.value;
  P.SApellido = this.val.ValForm.get("txtSegundoApellido")?.value;
  P.Sexo = this.val.ValForm.get("rdSexo")?.value;
  P.IdDepto=_filalugar.IdDepto;
  P.IdCiudad=_filalugar.IdMunicipio;
  P.FechaNacim = this.val.ValForm.get("txtFechaNacimiento")?.value;
  P.Ocupacion = this.val.ValForm.get("txtOcupacion")?.value;
  P.Identificacion = this.val.ValForm.get("txtCedula")?.value;
  P.IdEscolaridad = 1;//this.val.ValForm.get("txtEscolaridad")?.value;
  P.ECivil = this.val.ValForm.get("txtEstadoCivil")?.value;
  P.Direccion = this.val.ValForm.get("txtDireccion")?.value;
  P.Telefono = this.val.ValForm.get("txtTelefono")?.value;
  P.Celular = this.val.ValForm.get("txtCelular")?.value;
  P.Correo = this.val.ValForm.get("txtCorreo")?.value;
  P.Religion = this.val.ValForm.get("txtReligion")?.value;
  P.Convive = Convivencia;
  P.Visita = Visitar;
  P.RefVisita = ReferVis;
  P.Trabaja =  (AntLab.split(";")[0] == "1") ;
  P.RefTrabajo = this.val.ValForm.get("txtRefTrab")?.value;
  P.UltimoTrabajo = (AntLab.split(";")[1] == "1");
  P.Referencia = "";
  P.TAcompanante = this.Acompanante.dataSource.data;
  this._CatalogoService.GuardarPaciente(P);
  
}

public seleccion_Ciudad(event : any){

  if (event.added.length){
    event.newSelection = event.added;
    let _Fila : any = this.lstMunicipio.find(f=> f.IdLugarNac == event.added);
    this.val.ValForm.get("txtMunicipio")?.setValue([_Fila.IdLugarNac]);
  }
    this.igxComboMunicipio.close();

}

public f_key_Enter_Ciudad(event: any){

  if(event.key == "Enter"){

    let _Item : any = this.igxComboMunicipio.dropdown;
    this.igxComboMunicipio.setSelectedItem([_Item._focusedItem.value.IdLugarNac]);
    this.val.ValForm.get("txtMunicipio")?.setValue([_Item._focusedItem.value.IdLugarNac]);

  }

}

   private LlenarLugarNac(datos: string): void {

    let _json = JSON.parse(datos);

    _json["d"].forEach(
      (b: any) => {
        this.lstMunicipio.push(b);
      }
    );

    this.igxComboMunicipio.data = this.lstMunicipio;

  }

  
public EditarPaciente(fila: any){
  this._Fila_Paciente = fila;

  if(this._Fila_Paciente == undefined) return;

  this.val.ValForm.get("txtNoExpediente")?.setValue(fila.NoExpediente);
  this.val.ValForm.get("txtFecha")?.setValue(fila.FechaIngreso);
  this.val.ValForm.get("txtPrimerNombre")?.setValue(fila.PNombre);
  this.val.ValForm.get("txtSegundoNombre")?.setValue(fila.SNombre);
  this.val.ValForm.get("txtPrimerApellido")?.setValue(fila.PApellido);
  this.val.ValForm.get("txtSegundoApellido")?.setValue(fila.SApellido);
  this.val.ValForm.get("txtMunicipio")?.setValue([fila.IdLugarNac]);
  this.val.ValForm.get("txtFechaNacimiento")?.setValue(fila.FechaNacim);
  this.val.ValForm.get("txtOcupacion")?.setValue(fila.Ocupacion);
  this.val.ValForm.get("txtCedula")?.setValue(fila.Identificacion);
  this.val.ValForm.get("txtEscolaridad")?.setValue(fila.IdEscolaridad);
  this.val.ValForm.get("txtEstadoCivil")?.setValue(fila.ECivil);
  this.val.ValForm.get("txtDireccion")?.setValue(fila.Direccion);
  this.val.ValForm.get("txtTelefono")?.setValue(fila.Telefono);
  this.val.ValForm.get("txtCelular")?.setValue(fila.Celular);
  this.val.ValForm.get("txtCorreo")?.setValue(fila.Correo);
  this.val.ValForm.get("txtReligion")?.setValue(fila.Religion);
 

  this.esDialog = true;


}

  Cerrar() : void{
    if(!this.esDialog)
    {
      this.ServerScv.CerrarFormulario();
    }
    else
    {
      this.ServerScv.change.emit(["CerrarDialog","frmPaciente",""])
    }
    
  }
  
  ngOnInit(): void {

    

    this._CatalogoService.change.subscribe(

      s =>{
        if (s[0] == "dato_Paciente_Guardar") {

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

          if(!this._Dialog) this.limpiar();
      } 
      

      }
    );

    this._FuncionesGenerales.change.subscribe(

      s =>{
        if (s[0] == "Llenar_lugarnacimiento") {
          this.LlenarLugarNac(s[1]);

          }
      }
    );




  }

}
/** 
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

/** @title Basic checkboxes
 
@Component({
  selector: 'checkbox-overview-example',
  templateUrl: 'checkbox-overview-example.html',
  styleUrls: ['checkbox-overview-example.css'],
})
export class CheckboxOverviewExample {
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
}*/