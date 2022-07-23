import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DepartamentoService } from '../../cat/service/departamento.service';
import { LoginService } from '../../config/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  @Output() change: EventEmitter<any> = new EventEmitter();
  

    constructor( public _Router: Router, public _Dialog: MatDialog, public _loginserv : LoginService, public _DptoService: DepartamentoService){;
    }

    public CerrarFormulario() : void{
      this.change.emit("CerrarForm");
    }
}
