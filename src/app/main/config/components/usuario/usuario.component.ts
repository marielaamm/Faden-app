import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsuarioComponent implements OnInit {

  public bol_HidePass : boolean = true;
  public bol_Inactivo : boolean = false;
  public cities: { name: string, id: string }[] = [];
  public val = new Validacion();

  constructor(private ServerScv : ServerService) {

    this.val.add("txtRol", "1","LEN>", "0");
    this.val.add("txtNombre", "1","LEN>", "0");
    this.val.add("txtApellido", "1","LEN>", "0");
    this.val.add("txtLogin", "1","LEN>", "0");
    this.val.add("txtLogin", "2","LEN>=", "3");
    this.val.add("txtPass", "1", "LEN>", "0");
    this.val.add("txtPass", "2", "LEN>=", "3");
    this.val.add("txtVendedor", "1","LEN>", "0");
    this.val.add("chkInactivo", "1","LEN>=", "0");
    
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
    this.cities = [{ name: 'London', id: 'UK01' }, { name: 'Sofia', id: 'BG01'}];
  }

}
