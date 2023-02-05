import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { IgxComboComponent } from 'igniteui-angular';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { iLugarNac } from 'src/app/main/shared/interface/i-lugarnac';
import { FuncionesGeneralesService } from 'src/app/main/shared/service/funciones-generales.service';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iMedicos } from '../../interface/i-medicos';
import { CatalogoService } from '../../service/catalogo.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {
  public lstMunicipio: iLugarNac[] = [];
  public val: Validacion = new Validacion();
  private _CatalogoService: CatalogoService;
  private _FuncionesGenerales: FuncionesGeneralesService;
  @Output() change: EventEmitter<any> = new EventEmitter();

  @ViewChild('txtMunicipio', { static: true })
  public igxComboMunicipio: IgxComboComponent;
  private esDialog : boolean = false;
  private _Fila_Medico : any = undefined;
 

  
  constructor(private ServerScv: ServerService, private _Dialog: MatDialog) {

    this.val.add("txtNoMedico", "1", "LEN>=", "0");
    this.val.add("txtFecha", "1", "LEN>=", "0");
    this.val.add("txtPrimerNombre", "1", "LEN>", "0");
    this.val.add("txtSegundoNombre", "1", "LEN>=", "0");
    this.val.add("txtPrimerApellido", "1", "LEN>", "0");
    this.val.add("txtSegundoApellido", "1", "LEN>=", "0");
    this.val.add("txtMunicipio", "1", "LEN>=", "0");
    this.val.add("txtFechaNacimiento", "1", "LEN>", "0");
    this.val.add("txtEdad", "1", "LEN>=", "0");
    this.val.add("txtCedula", "1", "LEN>", "0");
    this.val.add("txtEspecialidad", "1", "LEN>", "0");
    this.val.add("txtDireccion", "1", "LEN>", "0");
    this.val.add("txtCorreo", "1", "LEN>=", "0");
    this.val.add("txtTelefono", "1", "LEN>=", "0");
    this.val.add("txtCelular", "1", "LEN>", "0");
    this.limpiar();

    this._CatalogoService = new CatalogoService(this._Dialog);
    this._FuncionesGenerales = new FuncionesGeneralesService(this._Dialog);
    this._FuncionesGenerales.BuscarFechaNac();


  }

  public limpiar() {
    this.val.ValForm.get("txtNoMedico")?.setValue("00000");
    this.val.ValForm.get("txtFecha")?.setValue("");
    this.val.ValForm.get("txtPrimerNombre")?.setValue("");
    this.val.ValForm.get("txtSegundoNombre")?.setValue("");
    this.val.ValForm.get("txtPrimerApellido")?.setValue("");
    this.val.ValForm.get("txtSegundoApellido")?.setValue("");
    this.val.ValForm.get("txtMunicipio")?.setValue("");
    this.val.ValForm.get("txtFechaNacimiento")?.setValue("");
    this.val.ValForm.get("txtEdad")?.setValue("");
    this.val.ValForm.get("txtCedula")?.setValue("");
    this.val.ValForm.get("txtEspecialidad")?.setValue("");
    this.val.ValForm.get("txtDireccion")?.setValue("");
    this.val.ValForm.get("txtCorreo")?.setValue("");
    this.val.ValForm.get("txtTelefono")?.setValue("");
    this.val.ValForm.get("txtCelular")?.setValue("");

    this.val.ValForm.get("txtNoMedico")?.disable();

    this.EditarMedico(this._Fila_Medico);

  }


  public singleSelection(event: any) {
    if (event.added.length) {
      event.newSelection = event.added;
    }
  }

  public Guardar(): void {
    let esError: string = " ";
    let mensaje: string = " <ol>";


    if (this.val.ValForm.get("txtPrimerNombre")?.invalid) {
      mensaje += "<li>Ingrese el primer nombre o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtPrimerApellido")?.invalid) {
      mensaje += "<li>Ingrese el primer apellido o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtMunicipio")?.invalid) {
      mensaje += "<li>Ingrese el nombre del municipio o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtFechaNacimiento")?.invalid) {
      mensaje += "<li>Ingrese la fecha de nacimiento o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtCedula")?.invalid) {
      mensaje += "<li>Ingrese el numero de cedulo o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtEspecialidad")?.invalid) {
      mensaje += "<li>Ingrese la especialidad médica o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtDireccion")?.invalid) {
      mensaje += "<li>Ingrese la direccion o revise la cantidad de caracteres</li>";
      esError += "1";
    }




    if (this.val.ValForm.get("txtCelular")?.invalid) {
      mensaje += "<li>Ingrese el número de celular o revise la cantidad de caracteres</li>";
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

    let M: iMedicos = {}as iMedicos;
    M.IdMedico = 0;
    M.NoMedico= this.val.ValForm.get("txtNoMedico")?.value;
    M.FechaIngreso = this.val.ValForm.get("txtFecha")?.value;
    M.PNombre = this.val.ValForm.get("txtPrimerNombre")?.value;
    M.SNombre=this.val.ValForm.get("txtSegundoNombre")?.value;
    M.PApellido=this.val.ValForm.get("txtPrimerApellido")?.value;
    M.SApellido=this.val.ValForm.get("txtSegundoApellido")?.value;
    M.NombreCompleto="";
    M.IdCiudad=_filalugar.IdMunicipio;
    M.IdDepto=_filalugar.IdDepto;
    M.FechaNac=this.val.ValForm.get("txtFechaNacimiento")?.value;
    M.Identificacion=this.val.ValForm.get("txtCedula")?.value;
    M.Especialidad=this.val.ValForm.get("txtEspecialidad")?.value;
    M.Direccion=this.val.ValForm.get("txtDireccion")?.value;
    M.Correo=this.val.ValForm.get("txtCorreo")?.value;
    M.Telefono=this.val.ValForm.get("txtTelefono")?.value;
    M.Celular=this.val.ValForm.get("txtCelular")?.value;

    
    this._CatalogoService.GuardarMedicos(M);

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

  public EditarMedico(fila: any){
   
    this._Fila_Medico = fila;

    if(this._Fila_Medico == undefined) return;

    this.val.ValForm.get("txtNoMedico")?.setValue(fila.NoMedico);
    this.val.ValForm.get("txtFecha")?.setValue(fila.FechaIngreso);
    this.val.ValForm.get("txtPrimerNombre")?.setValue(fila.PNombre);
    this.val.ValForm.get("txtSegundoNombre")?.setValue(fila.SNombre);
    this.val.ValForm.get("txtPrimerApellido")?.setValue(fila.PApellido);
    this.val.ValForm.get("txtSegundoApellido")?.setValue(fila.SApellido);
    this.val.ValForm.get("txtMunicipio")?.setValue([fila.IdLugarNac]);
    this.val.ValForm.get("txtFechaNacimiento")?.setValue(fila.FechaNac);
    this.val.ValForm.get("txtEdad")?.setValue("");
    this.val.ValForm.get("txtCedula")?.setValue(fila.Identificacion);
    this.val.ValForm.get("txtEspecialidad")?.setValue(fila.Especialidad);
    this.val.ValForm.get("txtDireccion")?.setValue(fila.Direccion);
    this.val.ValForm.get("txtCorreo")?.setValue(fila.Correo);
    this.val.ValForm.get("txtTelefono")?.setValue(fila.Telefono);
    this.val.ValForm.get("txtCelular")?.setValue(fila.Celular);

    this.esDialog = true;
  }




  Cerrar(): void {
    if(!this.esDialog)
    {
      this.ServerScv.CerrarFormulario();
    }
    else
    {
      this.ServerScv.change.emit(["CerrarDialog","frmMedico", ""])
    }
  }


 

  ngOnInit(): void {

    

    this._CatalogoService.change.subscribe(

      s =>{
        if (s[0] == "dato_Medicos_Guardar") {

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

          if(this.esDialog){
            this.Cerrar();
          }
          else
          {

            this.limpiar()
          }

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


