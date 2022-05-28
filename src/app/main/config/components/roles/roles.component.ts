import { Component, OnInit } from '@angular/core';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public cities: { name: string, id: string }[] = [];
  public val = new Validacion();
  
  constructor(private ServerScv : ServerService) {
    this.val.add("txtRol", "1","LEN>", "0");
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
    this.ServerScv.change.subscribe(s =>{

      if(s instanceof Array){
        if(s[0] == "DatosModal" && s[1] == "modal-registro-roles" ) {
          console.log(s[2]);
        }
      }

    });
    
  }

}
