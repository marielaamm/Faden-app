import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { DynamicNavDirective } from 'src/app/main/config/components/menu/nav/dynamic-nav.directive';
import { ProformaComponent } from 'src/app/main/fac/components/proforma/proforma.component';
import { DynamicFormDirective } from 'src/app/main/shared/directive/dynamic-form.directive';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { RolesComponent } from '../roles/roles.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @ViewChild(DynamicNavDirective, { static: true }) dynamicNav!: DynamicNavDirective;
  @ViewChild(DynamicFormDirective, { static: true }) dynamicForm!: DynamicFormDirective;


  private str_NomModulo : string = "INICIO";
  private str_Modulo : string = "";
  private str_formulario : string = "";


  @Input() public href: string | undefined;
  @HostListener('click', ['$event']) public onClick(event: Event): void {
    if (
      !this.href ||
      this.href == '#' ||
      (this.href && this.href.length === 0)
    ) {
      var element = <HTMLElement>event.target;

      
      if (element.tagName.toString().toLocaleLowerCase() == "a" && element.getAttribute("href") == "#") {
       
        this.AbrirFormulario(element.id);
      }

      if (element.tagName.toString().toLocaleLowerCase() == "span") {
        return;
      }

      event.preventDefault();
    }
  }

  

  constructor(private ServerScv : ServerService) {
    //this.ServerScv._loginserv.VerificarSession();
  }


  public AbrirModulo(m : string) : void{
    let faden_NAV : any;



    let parent  = document.getElementById("modulos")?.getElementsByTagName('a');
    let child = Array.prototype.slice.call(parent)

    Array.from(child).forEach((element) => {
      element?.classList.remove('activo');
    });


    if(this.str_NomModulo == m) return;

    this.str_Modulo = m;

    this.dynamicNav.viewContainerRef.clear()
    faden_NAV = this.dynamicNav.viewContainerRef.createComponent(NavComponent);

    switch(m){
      case "SIS":
        this.str_NomModulo = "CONFIGURACIÓN";
        document.getElementById("mov_sis")?.classList.add('activo');
        break;

      case "FAC":
        this.str_NomModulo = "FACTURACIÓN";
        document.getElementById("mov_fac")?.classList.add('activo');
        break;
      
      default:
        this.str_NomModulo = "INICIO";
        document.getElementById("mov_inicio")?.classList.add('activo');
        break;
    }


    faden_NAV.instance.str_Nombre = this.str_NomModulo
    faden_NAV.instance.str_Modulo = this.str_Modulo

  }

  public CerrarSession() : void{
    this.ServerScv._loginserv.CerrarSession();
  }


  public AbrirFormulario(f : string) : void{

    switch(this.str_Modulo){
      case "SIS":
        this.Modulo_SIS(f)
        break;

      case "FAC":
        this.Modulo_FAC(f)
        break;
    }

    
  }


  private Modulo_SIS(f : string) : void{


    switch(f){
      case "LinkUsuario":
        
        if(this.str_formulario != f){
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(UsuarioComponent);
          this.str_formulario = f;
        }

        
        break;

      case "navRol":

        if(this.str_formulario != f){
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(RolesComponent);
          this.str_formulario = f;
        }

        break;
    }
    
   
    

    
  }


  private Modulo_FAC(f : string) : void{
    switch(f){
      case "LinkProforma":
        
        if(this.str_formulario != f){
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(ProformaComponent);
          this.str_formulario = f;
        }

        
        break;

        break;
    }
    
   
  }


  ngOnInit(): void {

    this.ServerScv.change.subscribe(s =>{
      if(s == "CerrarForm"){
        this.dynamicForm.viewContainerRef.clear();
        this.str_formulario = "";
      }

      if(s instanceof Array){

        if(s[0] == "CerrarModal"){
          document.getElementById(s[1])!.click();

          if(s[2] != undefined) this.ServerScv.change.emit(["DatosModal", s[1], s[2]])
        }
        
      }

    });
  }

  ngAfterContentInit(): void {
    this.AbrirModulo("");
  }

}
