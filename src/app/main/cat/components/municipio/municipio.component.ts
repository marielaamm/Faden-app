import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss']
})
export class MunicipioComponent implements OnInit {

  constructor(private ServerScv : ServerService) { }

  Cerrar() : void {

    this.ServerScv.CerrarFormulario();

  }

  ngOnInit(): void {
  }

}
