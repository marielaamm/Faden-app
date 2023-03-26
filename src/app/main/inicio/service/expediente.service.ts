import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Conexion } from '../../shared/class/conexion';
import { DialogoComponent } from '../../shared/components/dialogo/dialogo.component';
import { iAntecedenteQuirurgico } from '../interface/i-antecedente-quirurgico';
import { iConsenso } from '../interface/i-consenso';
import { iPaciente } from '../interface/i-paciente';
import { iSistemaSoap } from '../interface/i-sistema-soap';
import { iTratamientoActual } from '../interface/i-tratamiento-actual';

@Injectable({
  providedIn: 'root'
})
export class ExpdienteService {

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


  public GuardarPaciente(Paciente : iPaciente){
    this.http.post<any>(this._Cnx.Url()+ "cat/Paciente/Guardar", JSON.stringify(Paciente),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Paciente_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Paciente_Guardar", _json]);
      },
        err =>{
          this.change.emit(["dato_Paciente_Guardar", undefined]);
          this.Msj();
      }
    );


  }

  public BuscarPaciente(){
    this.http.get<any>(this._Cnx.Url() + "cat/Paciente/Buscar").subscribe(
      datos =>{
        this.change.emit(["Llenar_paciente", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }


  public GuardarConsenso(Consenso : iConsenso){
    this.http.post<any>(this._Cnx.Url()+ "cat/Consenso/Guardar", JSON.stringify(Consenso),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Consenso_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Consenso_Guardar", _json]);
      },
        err =>{
          this.change.emit(["dato_Consenso_Guardar", undefined]);
          this.Msj();
      }
    );


  }

  public GuardarSOAP(Soap : iSistemaSoap){
    this.http.post<any>(this._Cnx.Url()+ "cat/SOAP/Guardar", JSON.stringify(Soap),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_SOAP_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_SOAP_Guardar", _json]);
      },
        err =>{
          this.change.emit(["dato_SOAP_Guardar", undefined]);
          this.Msj();
      }
    );


  }




  public GuardarTratamiento(T : iTratamientoActual){
    this.http.post<any>(this._Cnx.Url()+ "cat/Tratamiento/Guardar", JSON.stringify(T),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Tratamiento_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Tratamiento_Guardar", _json]);
      },
        err =>{
          this.change.emit(["dato_Tratamiento_Guardar", undefined]);
          this.Msj();
      }
    );


  }


  public BuscarTratamiento(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/Tratamiento/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Tratamiento", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }


  public EliminarTratamiento(IdTratamiento : Number){
    this.http.post<any>(this._Cnx.Url()+ "cat/Tratamiento/Eliminar?IdTratamiento=" + IdTratamiento,{headers: {"content-type":"application/text"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Tratamiento_Eliminar", undefined]);
          return;
        }
        this.change.emit(["dato_Tratamiento_Eliminar", _json]);
      },
        err =>{
          this.change.emit(["dato_Tratamiento_Eliminar", undefined]);
          this.Msj();
      }
    );
  }








  public GuardarAntecedenteQuirurgico(e : iAntecedenteQuirurgico){
    this.http.post<any>(this._Cnx.Url()+ "cat/AntecedenteQuirurgico/Guardar", JSON.stringify(e),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Antecedente_Quirurgico_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Antecedente_Quirurgico_Guardar", _json]);
      },
        err =>{
          this.change.emit(["dato_Antecedente_Quirurgico_Guardar", undefined]);
          this.Msj();
      }
    );


  }


  public BuscarAntecedenteQuirurgico(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/AntecedenteQuirurgico/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Antecedente_Quirurgico", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

  public EliminarAntecedenteQuirurgico(IdAntQ : Number){
    this.http.post<any>(this._Cnx.Url()+ "cat/AntecedenteQuirurgico/Eliminar?IdAntQ=" + IdAntQ,{headers: {"content-type":"application/text"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Antecedente_Quirurgico_Eliminar", undefined]);
          return;
        }
        this.change.emit(["dato_Antecedente_Quirurgico_Eliminar", _json]);
      },
        err =>{
          this.change.emit(["dato_Antecedente_Quirurgico_Eliminar", undefined]);
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
