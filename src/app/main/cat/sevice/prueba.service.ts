import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Conexion } from '../../shared/class/conexion';
import { DialogoComponent } from '../../shared/components/dialogo/dialogo.component';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private cnx = new Conexion();
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private _Router: Router, private http: HttpClient, private _Dialog: MatDialog) { }

  public BuscarCiudad(){
    this.http.get<any>(this.cnx.Url()+"cat/Municipio/Buscar").subscribe(
     
      datos =>{
     
        this.change.emit(["Llenar_ciudad", datos]);
      },
      err =>{
        this.Msj();
      }

    );


  }

  private Msj () : void{


    let s : string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\""+ 1 + "\",\"Mensaje\":\""+ "Error al conectar con el servidor."+ "\"}"+ ", \"count\":"+ 0 + ", \"esError\":"+ 1 + "}";
    let _json = JSON.parse(s);

    this._Dialog.open(DialogoComponent, {
      data: _json["msj"],
    });


  }
}
