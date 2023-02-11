import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';
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


  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {

    this.val.add("txtRol", "1","LEN>", "0");
    this.val.add("txtNombre", "1","LEN>", "0");
    this.val.add("txtApellido", "1","LEN>", "0");
    this.val.add("txtLogin", "1","LEN>", "0");
    this.val.add("txtLogin", "2","LEN>=", "3");
    this.val.add("txtPass", "1", "LEN>", "0");
    this.val.add("txtPass", "2", "LEN>=", "3");
    this.val.add("txtVendedor", "1","LEN>", "0");
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
