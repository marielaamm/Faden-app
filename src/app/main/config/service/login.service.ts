
import { HttpClient, HttpHandler } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Conexion } from '../../shared/class/conexion';
import { DialogoComponent } from '../../shared/components/dialogo/dialogo.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _Cnx = new Conexion();
  @Output() change: EventEmitter<any> = new EventEmitter();

  private isCancel : boolean = false;
  public isOpen : boolean = false;
  public isLogin : boolean = false;

  private Nombre : string = "";
  private str_Form : string = "";
  private str_user : string = "";
  private str_pass : string = "";
  private str_Fecha : string = "";


  constructor(private _Router: Router, private http : HttpClient, private _Dialog: MatDialog) { }


  public VerificarSession() : void {


    if(localStorage.getItem("User") != null)
    {
      this.str_user = <string>localStorage.getItem("User");
      this.str_pass = <string>localStorage.getItem("Pwd");
      this.Nombre = <string>localStorage.getItem("Nombre");
    }

    if(this.str_user == "") {
      this.CerrarSession();
      return;
    }
    if(this.str_pass == "") {
      this.CerrarSession();
      return;
    }

    this.http.get<any>(this._Cnx.Url() + "Usuario" + "?usr="+this.str_user+"&pwd="+ this.str_pass).subscribe(
      datos => {
        this.ProcesarAcceso(JSON.parse(datos));
      },
      err =>{

        let s : string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\""+ 1 + "\",\"Mensaje\":\""+ "Error al conectar con el servidor."+ "\"}"+ ", \"count\":"+ 0 + ", \"esError\":"+ 1 + "}";
        this.ProcesarAcceso(JSON.parse(s));
      }
    );

  }

  private GuardarSession(bol_recordar : boolean, str_user : string, str_pass : string, str_Nombre : string, str_Fecha : string ) : void
  {
    this.Nombre = str_Nombre;
    this.str_user = str_user;
    this.str_pass = str_pass;
    this.str_Fecha = str_Fecha;

    if(bol_recordar)
    {
      localStorage.setItem('Nombre', str_Nombre);
      localStorage.setItem('User', str_user);
      localStorage.setItem('Pwd', str_pass);
      localStorage.setItem('Fecha', str_Fecha);
    }

    sessionStorage.setItem('Nombre', str_Nombre);
    sessionStorage.setItem('User', str_user);
    sessionStorage.setItem('Pwd', str_pass);
    sessionStorage.setItem('Fecha', str_Fecha);

    this.isLogin = true;

  }


  
  public CerrarSession() : void{
    
    this.str_user = "";
    this.str_pass = "";
    this.str_Fecha = "";

    localStorage.removeItem("User");
    localStorage.removeItem("Pwd");
    localStorage.removeItem("Fecha");
    localStorage.removeItem("Nombre");

    sessionStorage.removeItem("User");
    sessionStorage.removeItem("Pwd");
    sessionStorage.removeItem("Fecha");
    sessionStorage.removeItem("Nombre");

    this.isLogin = false;
    this.ProcesarAcceso("");
  }






  InicioSesion(str_user : string, str_pass : string, bol_recordar : boolean) : void {

     this.http.get<any>(this._Cnx.Url() + "Usuario" + "?usr="+str_user+"&pwd="+ str_pass).subscribe(
      datos => {

        
        let _json = (JSON.parse(datos));

        if(Object.keys(_json["d"]).length > 0)
        {

          this.GuardarSession(bol_recordar,  str_user, str_pass, _json["d"][0]["Nombre"], _json["d"][0]["Fecha"]);
          this.ProcesarAcceso(_json);
        }
        else
        {
          this.CerrarSession();
        }

        
      },
      err =>{

        let s : string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\""+ 1 + "\",\"Mensaje\":\""+ "Error al conectar con el servidor."+ "\"}"+ ", \"count\":"+ 0 + ", \"esError\":"+ 1 + "}";
        this.ProcesarAcceso(JSON.parse(s));
      }
    );

  }
  

  private Msj (s : any) : void{
    this.isLogin = false;

    let _json = s

    this._Dialog.open(DialogoComponent, {
      data: _json["msj"],
    });

    this.change.emit("");
  }

  private ProcesarAcceso(s : any) : void{

    this._Router.navigate(['/Menu'], { skipLocationChange: false });
    return;
        let _json = s
  
        if(s == ""){
          this._Router.navigate(['/Login'], { skipLocationChange: false });
          return;
        }


        if( _json["msj"]["Mensaje"] != ""){
          this.Msj(_json);
        }

  
        if(_json["count"] > 0){
          this._Router.navigate(['/Menu'], { skipLocationChange: false });
        }
        else{
          this._Router.navigate(['/Login'], { skipLocationChange: false });
        }

  }

}
