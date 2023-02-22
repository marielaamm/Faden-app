import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iUsuario } from '../../Interface/i-Usuario';
import { SistemaService } from '../../service/sistema.service';
import { I_Rol } from '../roles/roles-registro/roles-registro.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsuarioComponent implements OnInit {

  public bol_HidePass : boolean = true;
  public bol_Inactivo : boolean = false;
  public lstRoles: I_Rol[] = [];

  public val = new Validacion();
  private _SistemaService: SistemaService;
  private IdUsuario : Number;
  serviceSIS: any;


  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {

    this.val.add("txtRol", "1","LEN>", "0");
    this.val.add("txtNombre", "1","LEN>", "0");
    this.val.add("txtApellido", "1","LEN>", "0");
    this.val.add("txtLogin", "1","LEN>", "0");
    this.val.add("txtLogin", "2","LEN>=", "3");
    this.val.add("txtPass", "1", "LEN>", "0");
    this.val.add("txtPass", "2", "LEN>=", "3");
    this.val.add("chkInactivo", "1","LEN>=", "0");
    this._SistemaService = new SistemaService(this._Dialog);
    this._SistemaService.BuscarRol();
   
   }

   private LlenarRol (datos: string): void {
    let _json = JSON.parse(datos);


    this.lstRoles = _json["d"];



  }


  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

Inactivo() :void{
  this.bol_Inactivo = !this.bol_Inactivo;
}

Cerrar() : void{
  /*this.viewContainerRef
    .element
    .nativeElement
    .parentElement
    .removeChild(this.viewContainerRef.element.nativeElement);*/

    this.ServerScv.CerrarFormulario();
    
}


public Guardar(): void {
  let esError: string = " ";
  let mensaje: string = " <ol>";

 if (this.val.ValForm.get("txtRol")?.invalid) {
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



mensaje += "</ol>"

if (esError.includes("1")) {
  let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Guardar\":\"" + 1 + "\",\"Mensaje\":\"" + mensaje + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
  let _json = JSON.parse(s);
  this._Dialog.open(DialogoComponent, {

    data: _json["msj"]
  });

  return;

}

let _FilaRol : any = this.lstRoles.find(f => f.IdRol == this.val.ValForm.get("txtRol")?.value);

let E: iUsuario = {}as  iUsuario;



E.IdUsuario = this.IdUsuario;
E.IdRol = _FilaRol.IdRol; 
E.Nombre = this.val.ValForm.get("txtNombre")?.value;
E.Apellido = this.val.ValForm.get("txtApellido")?.value;
E.Usuario1 = this.val.ValForm.get("txtLogin")?.value;
E.Contrasena = this.val.ValForm.get("txtPass")?.value;
E.Activo = true;
this.serviceSIS.GuardarUsuario(E);

 }




  ngOnInit(): void {
    this._SistemaService.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "Llenar_Rol") {
          this.LlenarRol(s[1]);
        }

      }
    });
  }

}
