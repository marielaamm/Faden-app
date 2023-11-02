import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { iAgendaMedica } from "../interface/i-agenda-medica";
import { Conexion } from "../../shared/class/conexion";


@Injectable({
    providedIn: 'root',
  })
export class postAgendaCita{
    
    private _Cnx = new Conexion();
    private http: HttpClient;

    constructor(){

        this.http = new HttpClient(new HttpXhrBackend({ 
            build: () => new XMLHttpRequest() 
        }));

    }

 
   Guardar(d : iAgendaMedica) : Observable<string> { 
   
    return this.http.post<any>(this._Cnx.Url() + "Agenda/Guardar", JSON.stringify(d), { headers: { 'content-type': 'application/json' } });

}


Cancelar(IdAgenda : Number) : Observable<string> { 
   
    return this.http.post<any>(this._Cnx.Url() + "Agenda/Cancelar?IdAgenda=" + IdAgenda, { headers: { 'content-type': 'application/text' } });

}

}