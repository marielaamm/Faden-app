import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Conexion } from '../../shared/class/conexion';
import { DialogoComponent } from '../../shared/components/dialogo/dialogo.component';
import { iDepartamento } from '../interface/i-departamento';
import { iEscolaridad } from '../interface/i-escolaridad';
import { iMedicos } from '../interface/i-medicos';
import { iMunicipio } from '../interface/i-municipio';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

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


  public BuscarDpto(codigo : string){
    this.http.get<any>(this._Cnx.Url() + "cat/Departamento/Buscar" + "?Codigo="+ codigo).subscribe(
      datos =>{
        this.change.emit(["Llenar_departamento", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

  public GuardarMunicipio(d : iMunicipio){

    this.http.post<any>(this._Cnx.Url()+ "cat/Municipio/Guardar", JSON.stringify(d) ,{headers: {"content-type":"application/json"}}).subscribe(
      dato =>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Municipio_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Municipio_Guardar", _json]);
      },
        err =>{
          this.change.emit(["dato_Municipio_Guardar", undefined]);
          this.Msj();
        }
    );

  }

  public GuardarDepartamento(Departamento : iDepartamento) {
    this.http.post<any>(this._Cnx.Url()+ "cat/Departamento/Guardar", JSON.stringify(Departamento),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Departamento_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Departamento_Guardar", _json]);
      },
        err =>{
          this.change.emit(["dato_Departamento_Guardar", undefined]);
          this.Msj();
      }
    );


  }

  public EliminarDepartamento(codigo : StringConstructor){
    this.http.post<any>(this._Cnx.Url()+ "cat/Departamento/Eliminar?codigo=" + codigo,{headers: {"content-type":"application/text"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Departamento_Eliminar", undefined]);
          return;
        }
        this.change.emit(["dato_Departamento_Eliminar", _json]);
      },
        err =>{
          this.change.emit(["dato_Departamento_Eliminar", undefined]);
          this.Msj();
      }
    );


  }

  public GuardarEscolaridad(Escolaridad : iEscolaridad) {
    this.http.post<any>(this._Cnx.Url()+ "cat/Escolaridad/Guardar", JSON.stringify(Escolaridad),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Escolaridad_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Escolaridad_Guardar", _json]);
      },
        err =>{
          this.change.emit(["dato_Escolaridad_Guardar", undefined]);
          this.Msj();
      }
    );
  }

  public GuardarMedicos(Medicos : iMedicos){
    this.http.post<any>(this._Cnx.Url()+ "cat/Medicos/Guardar", JSON.stringify(Medicos),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Medicos_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Medicos_Guardar", _json]);
      },
        err =>{
          this.change.emit(["dato_Medicos_Guardar", undefined]);
          this.Msj();
      }
    );


  }

  public EliminarMedicos(NoMedico : StringConstructor){
    this.http.post<any>(this._Cnx.Url()+ "cat/Medicos/Eliminar?NoMedico=" + NoMedico,{headers: {"content-type":"application/text"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Medicos_Eliminar", undefined]);
          return;
        }
        this.change.emit(["dato_Medicos_Eliminar", _json]);
      },
        err =>{
          this.change.emit(["dato_Medicos_Eliminar", undefined]);
          this.Msj();
      }
    );


  }

  public BuscarMedico(NoMedico : string){
    this.http.get<any>(this._Cnx.Url() + "cat/Medico/Buscar" + "?NoMedico="+ NoMedico).subscribe(
      datos =>{
        this.change.emit(["Llenar_medico", datos]);
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
