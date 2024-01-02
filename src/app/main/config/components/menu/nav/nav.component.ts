import { Component, ViewChild } from '@angular/core';
import { faLocust } from '@fortawesome/free-solid-svg-icons';
import { Funciones } from 'src/app/main/shared/class/cls_Funciones';
import { DynamicFormDirective } from 'src/app/main/shared/directive/dynamic-form.directive';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})



export class NavComponent{

  public str_Nombre : string = "";
  public str_Modulo : string = "";

  @ViewChild(DynamicFormDirective, { static: true }) dynamicForm!: DynamicFormDirective;

  



  constructor(private cFunciones : Funciones) { }

  public Menu() : any[]{
    return this.cFunciones.ACCESO.filter(f => f.MenuPadre == "" && f.Modulo ==  this.str_Modulo && f.Seleccionar)
  }

  public SubMenu(Menu : string) : any[]{
    return this.cFunciones.ACCESO.filter(f => f.MenuPadre == Menu && f.Modulo ==  this.str_Modulo && f.Seleccionar);
  }



}
