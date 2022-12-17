import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Conexion } from '../class/conexion';
import { DialogoComponent } from '../components/dialogo/dialogo.component';

@Injectable({
  providedIn: 'root'
})
export class FuncionesGeneralesService {

  private _Cnx = new Conexion();
  @Output() change: EventEmitter<any> = new EventEmitter();
  private http: HttpClient;
  private IsDialogOpen : boolean = false;

  constructor(public _Dialog: MatDialog) { 

    this.http = new HttpClient(new HttpXhrBackend({ 
      build: () => new XMLHttpRequest() 
  }));

    this._Dialog.afterOpened.subscribe(() => {
      this.IsDialogOpen = true;
    });

    this._Dialog.afterAllClosed.subscribe(() => {
      this.IsDialogOpen = false;
    });
  }

  public BuscarFechaNac(){
    this.http.get<any>(this._Cnx.Url() + "fn/BuscarFechaNac" ).subscribe(
      datos =>{
        this.change.emit(["Llenar_lugarnacimiento", datos]);
      },
      err =>{
        this.Msj();
      }


    );
  }

  public FechaServidor(){
    this.http.get<any>(this._Cnx.Url()+"fn/BuscarFechaServidor").subscribe(datos=>{
      this.change.emit(["Llenar_FechaServidor", datos]);
    },
    err =>{
      this.Msj();
    }
      
      )

  }

  private Msj () : void{


    let s : string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\""+ 1 + "\",\"Mensaje\":\""+ "Error al conectar con el servidor."+ "\"}"+ ", \"count\":"+ 0 + ", \"esError\":"+ 1 + "}";
    let _json = JSON.parse(s);

    this._Dialog.open(DialogoComponent, {
      data: _json["msj"],
    });


  }

}

