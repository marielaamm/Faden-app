import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-consensomedico',
  templateUrl: './consensomedico.component.html',
  styleUrls: ['./consensomedico.component.scss']
})
export class ConsensomedicoComponent implements OnInit {

  public isLinear = false;
  
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
