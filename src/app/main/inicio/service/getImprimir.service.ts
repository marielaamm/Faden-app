import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Conexion } from "../../shared/class/conexion";


@Injectable({
    providedIn: 'root',
  })
export class getImprimir{
    
    private _Cnx = new Conexion();
    private http: HttpClient;

    constructor(){

        this.http = new HttpClient(new HttpXhrBackend({ 
            build: () => new XMLHttpRequest() 
        }));

    }

   public Imprimir(op : string) : Observable<string>{
    return this.http.get<any>(this._Cnx.Url() + "Reporte/Imprimir?op=" + op);
 }
   

}