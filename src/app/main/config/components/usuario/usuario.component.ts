import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iUsuario } from '../../Interface/i-Usuario';
import { SistemaService } from '../../service/sistema.service';
import { I_Rol } from '../roles/roles-registro/roles-registro.component';
import { iMedicos } from 'src/app/main/cat/interface/i-medicos';
import { GlobalPositionStrategy, IgxComboComponent, OverlaySettings, scaleInCenter, scaleOutCenter } from 'igniteui-angular';
import { Funciones } from 'src/app/main/shared/class/cls_Funciones';
import { getUsuario } from '../../service/getUsuario';
import { iRol } from '../../Interface/i-Rol';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsuarioComponent implements OnInit {

  public bol_HidePass : boolean = true;
  public bol_Activo : boolean = false;
  public lstRoles: I_Rol[] = [];
  public bol_Guardando : boolean = false;
  public EsModal : boolean = false;

  public val = new Validacion();
  private _SistemaService: SistemaService;
  private IdUsuario : Number;

  public lstMedico: iMedicos[] = [];
  private isLoad : boolean = false;

  public overlaySettings: OverlaySettings = {};


  constructor(private ServerScv : ServerService, private _Dialog: MatDialog, private cFunciones : Funciones, private GET : getUsuario) {

    this.val.add("cmbRol", "1","LEN>", "0");
    this.val.add("txtNombre", "1","LEN>", "0");
    this.val.add("txtApellido", "1","LEN>", "0");
    this.val.add("txtLogin", "1","LEN>", "0");
    this.val.add("txtLogin", "2","LEN>=", "3");
    this.val.add("txtPass", "1", "LEN>", "0");
    this.val.add("txtPass", "2", "LEN>=", "3");
    this.val.add("chkInactivo", "1","LEN>=", "0");
    this.val.add("cmbMedico", "1","LEN>", "0");
    this._SistemaService = new SistemaService(this._Dialog);
    this.v_CargarDatos();
    
   
    this.Limpiar();
   }

   private LlenarRol (datos: string): void {
    let _json = JSON.parse(datos);


    this.lstRoles = _json["d"];



  }

  private Limpiar()
  {
    this.bol_Guardando = true;
    this.val.ValForm.get("cmbRol")?.setValue([]);
    this.val.ValForm.get("txtNombre")?.setValue("");
    this.val.ValForm.get("txtApellido")?.setValue("");
    this.val.ValForm.get("txtLogin")?.setValue("");
    this.val.ValForm.get("txtPass")?.setValue("");
    this.val.ValForm.get("cmbMedico")?.setValue("");
    this.val.ValForm.get("chkActivo")?.setValue(true);
    this.val.ValForm.get("")?.setValue("");
  }


  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

Activo() :void{
  this.bol_Activo = !this.bol_Activo;
}

Cerrar() : void{
  if(this.EsModal)
  {
    this.ServerScv.change.emit(["CerrarDialog","frmUsuario", ""]);
  }
  else
  {
    
    this.ServerScv.CerrarFormulario();
  }
    
}


@ViewChild("cmbRol", { static: false })
public cmbRol: IgxComboComponent;

public v_Select_Rol(event: any) {

  if (event.added.length) {
    if(event.oldSelection[0] != event.added[0]) event.newSelection =   event.added;
    this.val.ValForm.get("cmbRol")?.setValue([event.added]);

  }
}

public v_Enter_Rol(event: any) {
  if (event.key == "Enter") {

    let cmb : any = this.cmbRol.dropdown;
      let _Item: iRol = cmb._focusedItem.value;
      this.cmbRol.setSelectedItem(_Item);
      this.val.ValForm.get("cmbMedico")?.setValue([_Item?.IdRol]);

  }
}



  
@ViewChild("cmbMedico", { static: false })
public cmbMedico: IgxComboComponent;

public v_Select_Medico(event: any) {


  if (event.added.length) {
    let i_Medico: iMedicos = this.lstMedico.find(f => f.IdMedico == event.added)!;
    if(event.oldSelection[0] != event.added[0]) event.newSelection =   event.added;
    this.val.ValForm.get("cmbMedico")?.setValue([event.added]);
    this.val.ValForm.get("txtNombre")?.setValue(i_Medico?.PNombre + " " + i_Medico.SNombre);
    this.val.ValForm.get("txtApellido")?.setValue(i_Medico?.PApellido + " " + i_Medico.SApellido);

  }
}

public v_Enter_Medico(event: any) {
  if (event.key == "Enter") {

    let cmb : any = this.cmbMedico.dropdown;
      let _Item: iMedicos = cmb._focusedItem.value;
      this.cmbMedico.setSelectedItem(_Item);
      this.val.ValForm.get("cmbMedico")?.setValue([_Item?.IdMedico]);

  }
}



public Editar(fila: any){

  this.EsModal= true;
  this.IdUsuario=fila.IdUsuario;
  this.cmbMedico.setSelectedItem(fila.IdMedico);
  this.cmbRol.setSelectedItem(fila.IdMedico);
  this.val.ValForm.get("cmbMedico")?.setValue([fila.IdMedico]);
  this.val.ValForm.get("cmbRol")?.setValue([fila.IdRol]);
  this.val.ValForm.get("txtNombre")?.setValue(fila.Nombre);
  this.val.ValForm.get("txtNombre")?.setValue(fila.Nombre);
  this.val.ValForm.get("txtApellido")?.setValue(fila.Apellido);
  this.val.ValForm.get("txtLogin")?.setValue(fila.Usuario1);
  this.val.ValForm.get("txtPass")?.setValue(fila.Contrasena);
  this.val.ValForm.get("chkActivo")?.setValue(fila.Activo);

 }


public v_CargarDatos(): void {


  document.getElementById("btnGuardar-Cita")?.setAttribute("disabled", "disabled");
  document.getElementById("btnCanclar-Cita")?.setAttribute("disabled", "disabled");





  this.GET.DatosUsuario().subscribe(
    {
      next: (data) => {


        let _json = JSON.parse(data);

        if (_json["esError"] == 1) {
          if (this.cFunciones.DIALOG.getDialogById("error-servidor-msj") == undefined) {
            this.cFunciones.DIALOG.open(DialogoComponent, {
              id: "error-servidor-msj",
              data: _json["msj"].Mensaje,
            });
          }
        } else {

          this.lstRoles = _json.d[0].d;
          this.lstMedico = _json.d[1].d;

        }

      },
      error: (err) => {



        if (this.cFunciones.DIALOG.getDialogById("error-servidor") == undefined) {
          this.cFunciones.DIALOG.open(DialogoComponent, {
            id: "error-servidor",
            data: "<b class='error'>" + err.message + "</b>",
          });
        }

      },
      complete: () => { 
        document.getElementById("btnGuardar-Cita")?.removeAttribute("disabled");
        document.getElementById("btnCanclar-Cita")?.removeAttribute("disabled"); 
      }
    }
  );


}




public Guardar(): void {

  let esError: string = " ";
  let mensaje: string = " <ol>";

 if (this.val.ValForm.get("cmbRol")?.invalid) {
  mensaje += "<li>Seleccione un Rol</li>";
  esError += "1";
}

if (this.val.ValForm.get("txtNombre")?.invalid) {
  mensaje += "<li>Ingrese el nombre del ususario</li>";
  esError += "1";
}

if (this.val.ValForm.get("txtApellido")?.invalid) {
  mensaje += "<li>Ingrese el Apellido del usuario</li>";
  esError += "1";
}

if (this.val.ValForm.get("txtLogin")?.invalid) {
  mensaje += "<li>Ingrese un nombre de acceso</li>";
  esError += "1";
}

if (this.val.ValForm.get("txtPass")?.invalid) {
  mensaje += "<li>Ingrese una contraseña</li>";
  esError += "1";
}

if (this.val.ValForm.get("cmbMedico")?.invalid) {
  mensaje += "<li>Seleccione un medico</li>";
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
this.bol_Guardando = true;
let _FilaRol : any = this.lstRoles.find(f => f.IdRol == this.val.ValForm.get("cmbRol")?.value[0]);

let E: iUsuario = {}as  iUsuario;



E.IdUsuario = this.IdUsuario;
E.IdRol = _FilaRol.IdRol; 
E.Nombre = this.val.ValForm.get("txtNombre")?.value;
E.Apellido = this.val.ValForm.get("txtApellido")?.value;
E.Usuario1 = this.val.ValForm.get("txtLogin")?.value;
E.Contrasena = this.val.ValForm.get("txtPass")?.value;
E.IdMedico = this.val.ValForm.get("cmbMedico")?.value[0]
E.Activo = this.bol_Activo;
this._SistemaService.GuardarUsuario(E);

 }




  ngOnInit(): void {


    this.overlaySettings = {};

    if (window.innerWidth <= 992) {
      this.overlaySettings = {
        positionStrategy: new GlobalPositionStrategy({ openAnimation: scaleInCenter, closeAnimation: scaleOutCenter }),
        modal: true,
        closeOnOutsideClick: true
      };
    }

    
    this._SistemaService.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "Llenar_Rol") {
          this.LlenarRol(s[1]);
        }


        if (s[0] == "dato_Usuario_Guardar") {

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
          
          
          if(this.EsModal){
            this.Cerrar();
          }
          else
          { 
          

          this.Limpiar();

 
          }

      }
    }
  });
  }

}
