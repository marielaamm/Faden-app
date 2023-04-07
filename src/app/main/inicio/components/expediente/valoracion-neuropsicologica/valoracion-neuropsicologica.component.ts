import { Component, OnInit } from '@angular/core';
import { ExpdienteService } from '../../../service/expediente.service';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-valoracion-neuropsicologica',
  templateUrl: './valoracion-neuropsicologica.component.html',
  styleUrls: ['./valoracion-neuropsicologica.component.scss']
})
export class ValoracionNeuropsicologicaComponent implements OnInit {

  private _ExpdienteService: ExpdienteService;
  public IdPaciente : Number = 0;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {


    this._ExpdienteService = new ExpdienteService(this._Dialog);

    this.limpiar();
   }


   public limpiar(){
  

    this._ExpdienteService = new ExpdienteService(this._Dialog);


  }
  

  ngOnInit(): void {

    this.limpiar();

   
    this.ServerScv.change.subscribe(s => {

      if(s[0] == "Menu Expediente") this.IdPaciente =  s[1];
      if(s[0] == "Cerrar Expediente") this.IdPaciente = 0

    });

  }

}
