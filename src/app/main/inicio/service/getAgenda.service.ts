import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Conexion } from "../../shared/class/conexion";


@Injectable({
    providedIn: 'root',
  })
export class getAgendaCita{
    
    private _Cnx = new Conexion();
    private http: HttpClient;

    constructor(){

        this.http = new HttpClient(new HttpXhrBackend({ 
            build: () => new XMLHttpRequest() 
        }));

    }

 
   public Datos() : Observable<string>{
      return this.http.get<any>(this._Cnx.Url() + "Agenda/Datos");
   }

   public Get(Fecha1 : Date, Fecha2 : Date) : Observable<string>{
    return this.http.get<any>(this._Cnx.Url() + "Agenda/Get?Fecha1=" + Fecha1 + "&Fecha2=" + Fecha2);
 }
   

}