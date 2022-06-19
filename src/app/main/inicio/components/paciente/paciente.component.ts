import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {
  public lstMunicipio: {}[] = [];
  public lstEscolaridad:{}[]=[];
  

  constructor(private ServerScv : ServerService) { }

  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

  Cerrar() : void{
    
    this.ServerScv.CerrarFormulario();
  }
  
  ngOnInit(): void {
  }

}
