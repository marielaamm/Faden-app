import { Component, ViewChild } from '@angular/core';
import { faLocust } from '@fortawesome/free-solid-svg-icons';
import { DynamicFormDirective } from 'src/app/main/shared/directive/dynamic-form.directive';

export interface I_Nav {
  EsMenu : boolean;
  Modulo : string;
  ModuloNombre : string;
  Id : string;
  Link : string;
  MenuPadre : string;
  Clase : string;
  }
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})



export class NavComponent{

  public str_Nombre : string = "";
  public str_Modulo : string = "";

  @ViewChild(DynamicFormDirective, { static: true }) dynamicForm!: DynamicFormDirective;

  

  public Perfiles: I_Nav[] = [



    /**************************************USUARIO************************************* */
    {EsMenu: true, Modulo : "SIS", ModuloNombre : "Configuración", Id: "navUsuario", Link : "Usuarios", MenuPadre : "", Clase : "bi bi-people-fill"},
    {EsMenu: false, Modulo : "SIS", ModuloNombre : "Configuración", Id: "LinkUsuario", Link : "Nuevo Usuario", MenuPadre : "navUsuario", Clase : "bi bi-person-plus-fill"},
    {EsMenu: false, Modulo : "SIS", ModuloNombre : "Configuración", Id: "LinkRegistroUsuario", Link : "Registro Usuarios", MenuPadre : "navUsuario", Clase : "bi bi-table"},


    /**************************************ROLES************************************* */
    {EsMenu: true, Modulo : "SIS", ModuloNombre : "Configuración", Id: "navRol", Link : "Roles", MenuPadre : "", Clase : "bi bi-key-fill"},
    {EsMenu: false, Modulo : "SIS", ModuloNombre : "Configuración", Id: "LinkRol", Link : "Nuevo Rol", MenuPadre : "navRol", Clase : "bi bi-key-fill"},
    {EsMenu: false, Modulo : "SIS", ModuloNombre : "Configuración", Id: "LinkRol-Registro", Link : "Registros", MenuPadre : "navRol", Clase : "bi bi-key-fill"},
   

    {EsMenu: true, Modulo: "CAT", ModuloNombre: "Catálogo", Id: "navDepartamento", Link: "Departamento", MenuPadre: "", Clase: ""},
    {EsMenu: false, Modulo: "CAT", ModuloNombre: "Catálogo", Id:"LinkNuevoDepartamento", Link: "Nuevo Departamento", MenuPadre: "navDepartamento", Clase: ""},
    {EsMenu: false, Modulo: "CAT", ModuloNombre: "Catálogo", Id:"LinkRegistrosDepartamento", Link: "Registros de Departamento", MenuPadre: "navDepartamento", Clase: ""},
    
    {EsMenu: true, Modulo: "CAT", ModuloNombre: "Catálogo", Id: "navMunicipio", Link: "Municipio", MenuPadre: "", Clase: ""}, 
    {EsMenu: false, Modulo: "CAT", ModuloNombre: "Catálogo", Id:"LinkNuevoMunicipio", Link: "Nuevo Municipio", MenuPadre: "navMunicipio", Clase: ""},
    {EsMenu: false, Modulo: "CAT", ModuloNombre: "Catálogo", Id:"LinkRegistroMunicipio", Link: "Registros de Municipio", MenuPadre: "navMunicipio", Clase: ""},
    
    {EsMenu: true, Modulo: "CAT", ModuloNombre: "Catálogo", Id: "navEscolaridad", Link: "Escolaridad", MenuPadre: "", Clase: ""}, 
    {EsMenu: false, Modulo: "CAT", ModuloNombre: "Catálogo", Id:"LinkNuevaEscolaridad", Link: "Nueva Escolaridad", MenuPadre: "navEscolaridad", Clase: ""},
    {EsMenu: false, Modulo: "CAT", ModuloNombre: "Catálogo", Id:"LinkRegistrosEscolaridad", Link: "Registros de Escolaridad", MenuPadre: "navEscolaridad", Clase: ""},

    {EsMenu: true, Modulo: "CAT", ModuloNombre: "Catálogo", Id:"navMedicos", Link: "Medicos", MenuPadre: "", Clase: ""},
    {EsMenu: false, Modulo: "CAT", ModuloNombre: "Catálogo", Id:"LinkNuevoMedico", Link: "Nuevo Medico", MenuPadre: "navMedicos", Clase: ""},
    {EsMenu: false, Modulo: "CAT", ModuloNombre: "Catálogo", Id:"LinkRegistrosMedico", Link: "Registros de medicos", MenuPadre: "navMedicos", Clase: ""},

  
  
  

      /**************************************INICIO************************************* */ 

      {EsMenu: false, Modulo: "HOME", ModuloNombre: "Inicio", Id:"navExpediente", Link: "Expediente" , MenuPadre: "", Clase : ""},
      {EsMenu: false, Modulo:"HOME", ModuloNombre:"Inicio", Id:"navsoap",Link:"Sistema SOAP", MenuPadre: "", Clase: "" },
      {EsMenu: false, Modulo:"HOME", ModuloNombre:"Inicio", Id:"navAgenda",Link:"Agrenda", MenuPadre: "", Clase: "" },
   

    

  ]
  
  constructor() { }

  public Menu() : I_Nav[]{
    return this.Perfiles.filter(f => f.MenuPadre == "" && f.Modulo ==  this.str_Modulo)
  }

  public SubMenu(Menu : string) : I_Nav[]{
    return this.Perfiles.filter(f => f.MenuPadre == Menu && f.Modulo ==  this.str_Modulo);
  }



}
