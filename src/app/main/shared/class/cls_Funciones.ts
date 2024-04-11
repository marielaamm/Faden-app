import { DatePipe, formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getServidor } from '../service/get-servidor';
import { I_Nav } from '../interface/i-Nav';


@Injectable({
  providedIn: 'root',
})
export class Funciones {



  private _TiempoDesconexion : number = 0;
  public IdMedico : number = 0;

  public FechaServer: Date;

  public TiempoDesconexion() : number{
    return this._TiempoDesconexion;
  }
  

  private datePipe: DatePipe = new DatePipe('en-US');

  public MonedaLocal = "COR";

  public User : string = "";
  public Nombre : string = "";
  public Rol : string = "";


  public ACCESO: I_Nav[] = [


    
    /**************************************EXPEDIENTE************************************* */ 
  
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo: "EXP", ModuloNombre: "Expediente", Id:"navExpediente", Link: "Paciente" , MenuPadre: "", Clase : ""},
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo:"EXP", ModuloNombre:"", Id:"navsoap",Link:"Sistema SOAP", MenuPadre: "", Clase: "" },
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo:"EXP", ModuloNombre:"", Id:"navReporte",Link:"Reporte", MenuPadre: "", Clase: "" },
     
    
    
    /**************************************AGRENDA************************************* */ 
  
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo: "AG", ModuloNombre: "Agenda Medica", Id:"navAgenda", Link: "Cita Medica" , MenuPadre: "", Clase : ""},

    
    
    /**************************************USUARIO************************************* */
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: true, Modulo : "SIS", ModuloNombre : "Configuración", Id: "navUsuario", Link : "Usuarios", MenuPadre : "", Clase : "bi bi-people-fill"},
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo : "SIS", ModuloNombre : "", Id: "LinkUsuario", Link : "Nuevo Usuario", MenuPadre : "navUsuario", Clase : "bi bi-person-plus-fill"},
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo : "SIS", ModuloNombre : "", Id: "LinkRegistroUsuario", Link : "Registro Usuarios", MenuPadre : "navUsuario", Clase : "bi bi-table"},
  
  
    /**************************************ROLES************************************* */
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: true, Modulo : "SIS", ModuloNombre : "", Id: "navRol", Link : "Roles", MenuPadre : "", Clase : "bi bi-key-fill"},
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo : "SIS", ModuloNombre : "", Id: "LinkRol", Link : "Nuevo Rol", MenuPadre : "navRol", Clase : "bi bi-key-fill"},
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo : "SIS", ModuloNombre : "", Id: "LinkRol-Registro", Link : "Registros", MenuPadre : "navRol", Clase : "bi bi-key-fill"},
   
  
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: true, Modulo: "CAT", ModuloNombre: "Catálogo", Id: "navDepartamento", Link: "Departamento", MenuPadre: "", Clase: ""},
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo: "CAT", ModuloNombre: "", Id:"LinkNuevoDepartamento", Link: "Nuevo Departamento", MenuPadre: "navDepartamento", Clase: ""},
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo: "CAT", ModuloNombre: "", Id:"LinkRegistrosDepartamento", Link: "Registros de Departamento", MenuPadre: "navDepartamento", Clase: ""},
    
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: true, Modulo: "CAT", ModuloNombre: "", Id: "navMunicipio", Link: "Municipio", MenuPadre: "", Clase: ""}, 
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo: "CAT", ModuloNombre: "", Id:"LinkNuevoMunicipio", Link: "Nuevo Municipio", MenuPadre: "navMunicipio", Clase: ""},
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo: "CAT", ModuloNombre: "", Id:"LinkRegistroMunicipio", Link: "Registros de Municipio", MenuPadre: "navMunicipio", Clase: ""},
    
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: true, Modulo: "CAT", ModuloNombre: "", Id: "navEscolaridad", Link: "Escolaridad", MenuPadre: "", Clase: ""}, 
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo: "CAT", ModuloNombre: "", Id:"LinkNuevaEscolaridad", Link: "Nueva Escolaridad", MenuPadre: "navEscolaridad", Clase: ""},
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo: "CAT", ModuloNombre: "", Id:"LinkRegistrosEscolaridad", Link: "Registros de Escolaridad", MenuPadre: "navEscolaridad", Clase: ""},
  
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: true, Modulo: "CAT", ModuloNombre: "", Id:"navMedicos", Link: "Medicos", MenuPadre: "", Clase: ""},
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo: "CAT", ModuloNombre: "", Id:"LinkNuevoMedico", Link: "Nuevo Medico", MenuPadre: "navMedicos", Clase: ""},
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo: "CAT", ModuloNombre: "", Id:"LinkRegistrosMedico", Link: "Registros de medicos", MenuPadre: "navMedicos", Clase: ""},
  
    /**************************************INICIO************************************* */ 
  
    {IdAcceso:0, IdRol : 0, Seleccionar: false, EsMenu: false, Modulo: "HOME", ModuloNombre: "Inicio", Id:"navInicio", Link: "" , MenuPadre: "", Clase : ""},
     
    
    
  
  ]
  


  constructor(public GET: getServidor, public DIALOG: MatDialog) {

  }



  public FechaServidor(f  : Date) {
    this.FechaServer = new Date(
      this.DateFormat(f, 'yyyy-MM-dd hh:mm:ss')
    );
  }
  

  public ShortFechaServidor() : string {
    return this.DateFormat(this.FechaServer, 'yyyy-MM-dd')
  }


    
  public SetTiempoDesconexion(n : number) : void{
     this._TiempoDesconexion = n;
  }




  public DateAdd(Tipo: string, Fecha: Date, Num: number): string {
    let f = new Date(Fecha);
    switch (Tipo) {
      case 'Day':
        return this.DateFormat(new Date(f.setDate( f.getDate() + Num)), 'yyyy-MM-dd');
        break;

      case 'Month':
        return this.DateFormat(
          new Date(f.setMonth(f.getMonth() + Num)),
          'yyyy-MM-dd'
        );
        break;

      case 'Year':
        return this.DateFormat(
          new Date(f.setFullYear(f.getFullYear() + Num)),
          'yyyy-MM-dd'
        );
        break;
    }

    return this.DateFormat(f, 'yyyy-MM-dd');
  }

  
  public LastDay(Fecha: Date): string {
    let f = new Date(Fecha.getFullYear(), Fecha.getMonth() + 1);

    return this.DateFormat(f, 'yyyy-MM-dd');
  }

  public DateFormat(fecha: Date, formart: string): string {
    return this.datePipe.transform(fecha, formart)!;
  }



  public NumFormat(valor: number, decimal : string): string {
    return formatNumber(valor, "en-IN",  "1."+decimal+"-"+decimal);
  }


  public Redondeo(valor : number, numDecimal : string) : number{

    valor = Number(valor);
    valor = (Math.round(valor * Math.pow(10, Number(numDecimal))) / Math.pow(10, Number(numDecimal)));

    return  Number(valor);
  }



  public v_Prevent_IsNumber(event : any, tipo : string) : void{

    if(event.key === "Backspace" || event.key === "Enter" || event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key == "ArrowDown" ||
    event.key === "F1" || event.key === "F2" || event.key === "F3" || event.key === "F4" || event.key === "F5" || event.key === "F6" || event.key === "F7" ||
    event.key === "F8" || event.key === "F9" || event.key === "F10" || event.key === "F11" || event.key === "F12") return;

    if(event.key == ",") {
      event.preventDefault();
      return;
    }
    

    if(tipo == "Decimal")
    {
      if((String(event.target.value).includes(".") && event.key == ".")  || ( event.key == "." && event.target.value == "")) {
        event.preventDefault();
        return;
      }
      
      if(String(event.target.value).includes("."))
      {
        let decimal : string[] = String(event.target.value).split(".");
  
        if(isNaN(parseFloat(event.key)) && !isFinite(event.key)){
          event.preventDefault();
          return;
        }
  
      }
      else{

        if(event.key != "." && (String(event.target.value) == ""  && !isFinite(event.key) || String(event.target.value) != "" && isNaN(parseFloat(event.key)))){
          event.preventDefault();
          return;
        }


       
      }

     

    }

    if(tipo == "Entero"){
      if(isNaN(parseFloat(event.key)) && !isFinite(event.key)){
        event.preventDefault();
        return;
      }
    }

   
  }


  public TamanoPantalla(t: string): number {

    let x: number = 0;
    switch (t) {

      case "sm":
        x = 576
        break;

      case "md":
        x = 768;
        break;

      case "lg":
        x = 992;
        break;
      
      case "xl":
        x = 1200;
        break;


    }


    return x;

  }

}


