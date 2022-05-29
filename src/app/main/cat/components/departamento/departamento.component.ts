import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  constructor(private ServerScv : ServerService) { }

  
  Cerrar() : void{
    
  
      this.ServerScv.CerrarFormulario();
      
  }
  ngOnInit(): void {
  }

}
