import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';


@Component({
  selector: 'app-escolaridad',
  templateUrl: './escolaridad.component.html',
  styleUrls: ['./escolaridad.component.scss']
})
export class EscolaridadComponent implements OnInit {

    constructor(private ServerScv : ServerService) { }

    Cerrar() : void{
    
        this.ServerScv.CerrarFormulario();
      
  }


  ngOnInit(): void {

    this.ServerScv.change.subscribe(s =>{

      if(s instanceof Array){
        if(s[0] == "DatosModal" && s[1] == "modal-registro-escolaridad" ) {
          console.log(s[2]);
        }
      }

    });

  }

}
