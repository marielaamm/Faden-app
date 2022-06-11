import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss']
})
export class MunicipioComponent implements OnInit {

  public lstDepartamento: {}[] = [];

  constructor(private ServerScv : ServerService) { }



  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

  Cerrar() : void {

    this.ServerScv.CerrarFormulario();

  }

  ngOnInit(): void {
 
  }

}
