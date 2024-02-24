import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Conexion } from '../../shared/class/conexion';
import { DialogoComponent } from '../../shared/components/dialogo/dialogo.component';
import { iRol } from '../Interface/i-Rol';
import { iUsuario } from '../Interface/i-Usuario';
import { WaitComponent } from '../../shared/components/wait/wait.component';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

 
  private _Cnx = new Conexion();
  @Output() change: EventEmitter<any> = new EventEmitter();
  
  
  private IsDialogOpen : boolean = false;

  private http: HttpClient;
  
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



  public GuardarRol(Rol : iRol) {

    
    document.getElementById("btn-reporte")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }



    this.http.post<any>(this._Cnx.Url()+ "SIS/Rol/Guardar", JSON.stringify(Rol),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-rol")?.removeAttribute("disabled");

        if(_json["esError"] == 1){
          this.change.emit(["dato_Rol_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Rol_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
          document.getElementById("btn-guardar-rol")?.removeAttribute("disabled");

          this.change.emit(["dato_Rol_Guardar", undefined]);
          this.Msj();
      }
    );
  }

  



  public BuscarRol(){
    this.http.get<any>(this._Cnx.Url() + "SIS/Rol/Buscar").subscribe(
      datos =>{
        this.change.emit(["Llenar_Rol", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }



  public GuardarUsuario(Usuario : iUsuario) {

    
    document.getElementById("btn-guardar-usuario")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }


    this.http.post<any>(this._Cnx.Url()+ "SIS/Usuario/Guardar", JSON.stringify(Usuario),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-usuario")?.removeAttribute("disabled");


        if(_json["esError"] == 1){
          this.change.emit(["dato_Usuario_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Usuario_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
          document.getElementById("btn-guardar-usuario")?.removeAttribute("disabled");

          this.change.emit(["dato_Usuario_Guardar", undefined]);
          this.Msj();
      }
    );
  }

  public BuscarUsuario(){
    this.http.get<any>(this._Cnx.Url() + "SIS/Usuario/Get").subscribe(
      datos =>{
        this.change.emit(["Llenar_Usuario", datos]);
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
