import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  constructor(private ServerScv : ServerService) { }

  
  Cerrar() : void{
    
  
      this.ServerScv.CerrarFormulario();
      
  }
  ngOnInit(): void {
    
    this.ServerScv.change.subscribe(s =>{

      if(s instanceof Array){
        if(s[0] == "DatosModal" && s[1] == "modal-registro-departamento" ) {
          console.log(s[2]);
        }
      }

    });
    
  }

}
