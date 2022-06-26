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
    {EsMenu: false, Modulo : "SIS", ModuloNombre : "Configuración", Id: "navRol", Link : "Roles", MenuPadre : "", Clase : "bi bi-key-fill"},
   

    {EsMenu: false, Modulo: "CAT", ModuloNombre: "Catálogo", Id: "navDepartamento", Link: "Departamento", MenuPadre: "", Clase: ""},
    
    {EsMenu: false, Modulo: "CAT", ModuloNombre: "Catálogo", Id: "navMunicipio", Link: "Municipio", MenuPadre: "", Clase: ""}, 

    {EsMenu: false, Modulo: "CAT", ModuloNombre: "Catálogo", Id: "navEscolaridad", Link: "Escolaridad", MenuPadre: "", Clase: ""}, 

      /**************************************INICIO************************************* */ 

      {EsMenu: true, Modulo: "HOME", ModuloNombre: "Inicio", Id:"navPaciente", Link: "Paciente" , MenuPadre: "", Clase : ""},
      {EsMenu: false, Modulo: "HOME", ModuloNombre: "Inicio", Id: "LinkPaciente", Link: "Nuevo Paciente", MenuPadre: "navPaciente", Clase: ""},
      {EsMenu: false, Modulo: "HOME", ModuloNombre: "Inicio", Id:"navhistoriamedica", Link: "Historial Médico" , MenuPadre: "", Clase : ""},


    
  ]
  
  constructor() { }

  public Menu() : I_Nav[]{
    return this.Perfiles.filter(f => f.MenuPadre == "" && f.Modulo ==  this.str_Modulo)
  }

  public SubMenu(Menu : string) : I_Nav[]{
    return this.Perfiles.filter(f => f.MenuPadre == Menu && f.Modulo ==  this.str_Modulo);
  }



}
