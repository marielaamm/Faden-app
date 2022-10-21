import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { iMunicipio } from 'src/app/main/cat/interface/i-municipio';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { iLugarNac } from 'src/app/main/shared/interface/i-lugarnac';
import { FuncionesGeneralesService } from 'src/app/main/shared/service/funciones-generales.service';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})

export class PacienteComponent implements OnInit {
  public lstMunicipio:  iLugarNac[] = [];
  public lstEscolaridad:{}[]=[];
  public val: Validacion = new Validacion();
  private _CatalogoService: CatalogoService;
  private _FuncionesGenerales: FuncionesGeneralesService;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {

    this.val.add("txtNoExpediente", "1", "LEN>=", "0");
    this.val.add("txtFecha", "1", "LEN>=", "0");
    this.val.add("txtPrimerNombre", "1", "LEN>=","0");
    this.val.add("txtSegundoNombre", "1", "LEN>", "0");
    this.val.add("txtPrimerApellido", "1", "LEN>=","0");
    this.val.add("txSegundoApellido", "1", "LEN>", "0");
    this.val.add("txtMunicipio", "1", "LEN>", "0");
    this.val.add("txtFechaNacimiento", "1", "LEN>", "0");
    this.val.add("txtEdad","1", "LEN>", "0");
    this.val.add("txtOcupacion","1", "LEN>", "0");
    this.val.add("txtCedula","1", "LEN>", "0");
    this.val.add("txtEscolaridad","1", "LEN>", "0");
    this.val.add("txtEstadoCivil","1", "LEN>", "0");
    this.val.add("txtDireccion","1", "LEN>", "0");
    this.val.add("txtTelefono","1", "LEN>", "0");
    this.val.add("txtCelular","1", "LEN>", "0");
    this.val.add("txtCorreo","1", "LEN>", "0");
    this.val.add("txtReligion","1", "LEN>", "0");
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
    this.val.ValForm.get("txSegundoApellido")?.setValue("");
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
    
   }


  private LlenarCiudad(datos:string):void{

    let _json = JSON.parse(datos);

    _json["d"].forEach(
      (b:any)=>{
        this.lstMunicipio.push(b);
      }
    );
    
  }

  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

public Guardar(){
  let esError: string = " ";
  let mensaje: string = " <ol>";

  if (this.val.ValForm.get("txtPrimerNombre")?.invalid) {
    mensaje += "<li>Ingrese el primer nombre o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtSegundoNombre")?.invalid) {
    mensaje += "<li>Ingrese el segundo nombre o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txtPrimerApellido")?.invalid) {
    mensaje += "<li>Ingrese el primer apellido o revise la cantidad de caracteres</li>";
    esError += "1";
  }

  if (this.val.ValForm.get("txSegundoApellido")?.invalid) {
    mensaje += "<li>Ingrese el segundo apellido revise la cantidad de caracteres</li>";
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

   


}



  Cerrar() : void{
    
    this.ServerScv.CerrarFormulario();
  }
  
  ngOnInit(): void {

    /*this.ServerScv._PruebaService.change.subscribe(s =>{

      if(s[0] == "Llenar_ciudad"){
        this.LlenarCiudad(s[1]);
      }
    });*/

    
    
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