import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CatalogoService } from '../../cat/service/catalogo.service';
import { PruebaService } from '../../cat/sevice/prueba.service';
import { LoginService } from '../../config/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  @Output() change: EventEmitter<any> = new EventEmitter();
  

    constructor( public _Router: Router, public _Dialog: MatDialog,
      public _loginserv : LoginService,
      public _CatalogoService: CatalogoService,
      public _PruebaService: PruebaService
      ){;
    }

    public CerrarFormulario() : void{
      this.change.emit("CerrarForm");
    }
}
