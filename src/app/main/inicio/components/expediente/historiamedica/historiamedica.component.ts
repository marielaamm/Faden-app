import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-historiamedica',
  templateUrl: './historiamedica.component.html',
  styleUrls: ['./historiamedica.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoriamedicaComponent implements OnInit {

  public lstPaciente:{}[]=[];
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
