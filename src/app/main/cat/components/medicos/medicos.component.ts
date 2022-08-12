import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {
  public lstMunicipio: {}[] = [];

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
