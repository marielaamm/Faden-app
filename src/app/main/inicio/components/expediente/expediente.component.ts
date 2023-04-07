import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { ConsensomedicoComponent } from '../consensomedico/consensomedico.component';
import { SindromepredominanteComponent } from '../consensomedico/sindromepredominante/sindromepredominante.component';
import { HistoriamedicaComponent } from './historiamedica/historiamedica.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ValoracionNeuropsicologicaComponent } from './valoracion-neuropsicologica/valoracion-neuropsicologica.component';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.scss']
})
export class ExpedienteComponent implements OnInit {


  @ViewChild('ViewHistorial', { static: false })
  public ViewHistorial: HistoriamedicaComponent;

  @ViewChild('ViewValoracion', { static: false })
  public ViewValoracion: ValoracionNeuropsicologicaComponent;

  @ViewChild('ViewConsenso', { static: true })
  public ViewConsenso: ConsensomedicoComponent;


  public bol_Disable = true;
  
  public estadoPanel = true;
  
  constructor(private ServerScv: ServerService) { }

  ngOnInit(): void {

    this.ServerScv.change.subscribe(s => {

      if(s[0] == "Menu Expediente") this.bol_Disable = false
      if(s[0] == "Cerrar Expediente") this.bol_Disable = true


    });

  }

}
