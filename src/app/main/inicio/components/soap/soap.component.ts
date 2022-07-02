import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-soap',
  templateUrl: './soap.component.html',
  styleUrls: ['./soap.component.scss']
})
export class SoapComponent implements OnInit {

  public isLinear = false;
  public lstPaciente:{}[]=[];

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
