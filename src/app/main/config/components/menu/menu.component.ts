import { Component, HostListener, Inject, Input, Renderer2, ViewChild } from '@angular/core';
import { DepartamentoRegistroComponent } from 'src/app/main/cat/components/departamento/departamento-registro/departamento-registro/departamento-registro.component';
import { DepartamentoComponent } from 'src/app/main/cat/components/departamento/departamento.component';
import { EscolaridadRegistroComponent } from 'src/app/main/cat/components/escolaridad/escolaridad-registro/escolaridad-registro.component';
import { EscolaridadComponent } from 'src/app/main/cat/components/escolaridad/escolaridad.component';
import { MedicosComponent } from 'src/app/main/cat/components/medicos/medicos.component';
import { RegistrosMedicosComponent } from 'src/app/main/cat/components/medicos/registros-medicos/registros-medicos.component';
import { MunicipioRegistroComponent } from 'src/app/main/cat/components/municipio/municipio-registro/municipio-registro.component';
import { MunicipioComponent } from 'src/app/main/cat/components/municipio/municipio.component';
import { DynamicNavDirective } from 'src/app/main/config/components/menu/nav/dynamic-nav.directive';
import { ConsensomedicoComponent } from 'src/app/main/inicio/components/consensomedico/consensomedico.component';
import { ExpedienteRegistroComponent } from 'src/app/main/inicio/components/expediente/expediente-registro/expediente-registro.component';
import { ExpedienteComponent } from 'src/app/main/inicio/components/expediente/expediente.component';
import { HistoriamedicaComponent } from 'src/app/main/inicio/components/expediente/historiamedica/historiamedica.component';
import { PacienteComponent } from 'src/app/main/inicio/components/expediente/paciente/paciente.component';
import { SoapComponent } from 'src/app/main/inicio/components/soap/soap.component';
import { DynamicFormDirective } from 'src/app/main/shared/directive/dynamic-form.directive';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { LoginService } from '../../service/login.service';
import { RolesRegistroComponent } from '../roles/roles-registro/roles-registro.component';
import { RolesComponent } from '../roles/roles.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import { NavComponent } from './nav/nav.component';
import { EstiloVidaComponent } from 'src/app/main/inicio/components/expediente/historiamedica/estilo-vida/estilo-vida.component';
import { AgendaCitaComponent } from 'src/app/main/inicio/components/agenda-cita/agenda-cita.component';
import { AgendaCitaRegComponent } from 'src/app/main/inicio/components/agenda-cita-reg/agenda-cita-reg.component';
import { DOCUMENT } from '@angular/common';
import { getServidor } from 'src/app/main/shared/service/get-servidor';
import { Funciones } from 'src/app/main/shared/class/cls_Funciones';
import { Subscription, interval } from 'rxjs';
import { DialogErrorComponent } from 'src/app/main/shared/components/dialog-error/dialog-error.component';
import { iDatos } from 'src/app/main/shared/interface/i-Datos';
import { RegistrousuarioComponent } from '../usuario/registrousuario/registrousuario.component';
import { ReporteComponent } from 'src/app/main/inicio/components/reporte/reporte.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @ViewChild(DynamicNavDirective, { static: true }) dynamicNav!: DynamicNavDirective;
  @ViewChild(DynamicFormDirective, { static: true }) dynamicForm!: DynamicFormDirective;


  private str_NomModulo: string = "Inicio";
  private str_Modulo: string = "HOME";
  private str_formulario: string = "";


  @ViewChild(DynamicFormDirective, { static: true }) DynamicFrom!: DynamicFormDirective;
  public ErrorServidor: boolean = false;

  subscription: Subscription = {} as Subscription;



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



  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: HTMLDocument,
    private _SrvLogin: LoginService,
    private Conexion: getServidor,
    private cFunciones: Funciones,
    private ServerScv: ServerService
  ) {
  }



  public AbrirModulo(m: string): void {
    let faden_NAV: any;



    let parent = document.getElementById("modulos")?.getElementsByTagName('a');
    let child = Array.prototype.slice.call(parent)

    Array.from(child).forEach((element) => {
      element?.classList.remove('activo');
    });


    if (this.str_NomModulo == m) return;

    this.str_Modulo = m;

    this.dynamicNav.viewContainerRef.clear()
    faden_NAV = this.dynamicNav.viewContainerRef.createComponent(NavComponent);

    switch (m) {

      case "HOME":
        this.str_NomModulo = "INICIO";
        document.getElementById("mov_inicio")?.classList.add('activo');
        break;

      case "EXP":
        this.str_NomModulo = "EXPEDIENTE";
        document.getElementById("mov_exp")?.classList.add('activo');
        break;


      case "AG":
        this.str_NomModulo = "AGENDA";
        document.getElementById("mov_ag")?.classList.add('activo');
        break;


      case "SIS":
        this.str_NomModulo = "CONFIGURACIÓN";
        document.getElementById("mov_sis")?.classList.add('activo');
        break;

      case "CAT":
        this.str_NomModulo = "CATALOGO";
        document.getElementById("mov_cat")?.classList.add('activo');
        break;


    }


    faden_NAV.instance.str_Nombre = this.str_NomModulo
    faden_NAV.instance.str_Modulo = this.str_Modulo

  }

  public CerrarSession(): void {
    this._SrvLogin.CerrarSession();
  }


  public AbrirFormulario(f: string): void {
    this.dynamicForm.viewContainerRef.clear();
    switch (this.str_Modulo) {

      case "EXP":
        this.Modulo_EXP(f);
        break;

      case "AG":
        this.Modulo_AG(f);
        break;


      case "SIS":
        this.Modulo_SIS(f);
        break;

      case "CAT":
        this.Modulo_CAT(f);
        break;
    }


  }
  private Modulo_EXP(f: string) {

    document.getElementById(this.str_formulario)?.classList.remove('activo');
    document.getElementById(f)?.classList.add('activo');

    switch (f) {


      case "navExpediente":

        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(ExpedienteComponent);
          this.str_formulario = f;
        }
        break;


      case "navsoap":
        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(SoapComponent);
          this.str_formulario = f;
        }
        break;

      case "navAgenda":
        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(AgendaCitaRegComponent);
          this.str_formulario = f;
        }
        break;

      case "navReporte":
        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(ReporteComponent);
          this.str_formulario = f;
        }
        break;
        break;


    }

  }


  private Modulo_AG(f: string) {

    document.getElementById(this.str_formulario)?.classList.remove('activo');
    document.getElementById(f)?.classList.add('activo');

    switch (f) {


      case "navAgenda":
        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(AgendaCitaRegComponent);
          this.str_formulario = f;
        }
        break;

    }

  }



  private Modulo_SIS(f: string): void {


    switch (f) {
      case "LinkUsuario":

        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(UsuarioComponent);
          this.str_formulario = f;
        }


        break;


      case "LinkRegistroUsuario":

        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(RegistrousuarioComponent);
          this.str_formulario = f;
        }


        break;




      case "LinkRol":

        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(RolesComponent);
          this.str_formulario = f;
        }

        break;

      case "LinkRol-Registro":

        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(RolesRegistroComponent);
          this.str_formulario = f;
        }

        break;
    }


  }


  private Modulo_CAT(f: string): void {
    switch (f) {
      case "LinkNuevoDepartamento":

        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(DepartamentoComponent);
          this.str_formulario = f;
        }


        break;

      case "LinkRegistrosDepartamento":
        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(DepartamentoRegistroComponent);
          this.str_formulario = f;

        }

        break;

      case "LinkNuevoMunicipio":
        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(MunicipioComponent);
          this.str_formulario = f;
        }
        break;

      case "LinkRegistroMunicipio":
        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(MunicipioRegistroComponent);
          this.str_formulario = f;

        }
        break;


      case "LinkNuevaEscolaridad":
        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(EscolaridadComponent);
          this.str_formulario = f;
        }

        break;


      case "LinkRegistrosEscolaridad":
        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(EscolaridadRegistroComponent);
          this.str_formulario = f;
        }

        break;

      case "LinkNuevoMedico":
        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(MedicosComponent);
          this.str_formulario = f;

        }

        break;

      case "LinkRegistrosMedico":
        if (this.str_formulario != f) {
          this.dynamicForm.viewContainerRef.clear();
          this.dynamicForm.viewContainerRef.createComponent(RegistrosMedicosComponent);
          this.str_formulario = f;

        }
        break;

    }


  }


  public Menu(str_Modulo: string, str_ModuloNombre: string): number {
    return this.cFunciones.ACCESO.findIndex(f => f.Modulo == str_Modulo && f.ModuloNombre == str_ModuloNombre && f.Seleccionar)
  }



  private ActualizarDatosServidor(): void {
    this.ErrorServidor = false;


    this.Conexion.FechaServidor(this.cFunciones.User).subscribe(
      {
        next: (data) => {

          let _json: any = JSON.parse(data);

          if (_json["esError"] == 1) {

            if (this.cFunciones.DIALOG.getDialogById("error-servidor-msj") == undefined) {
              this.cFunciones.DIALOG.open(DialogErrorComponent, {
                id: "error-servidor-msj",
                data: _json["msj"].Mensaje,
              });
            }

          } else {
            let Datos: iDatos[] = _json["d"];

            this.cFunciones.FechaServidor(Datos[0].d);
            this.cFunciones.SetTiempoDesconexion(Number(Datos[1].d));
            this._SrvLogin.UpdFecha(String(Datos[0].d));


            this.cFunciones.ACCESO.filter(f => {

              let nav: any = Datos[2].d.find((w: any) => w.Modulo == f.Modulo && w.Id == f.Id);

              if (nav != undefined) {
                f.IdAcceso = nav.IdAcceso;
                f.Seleccionar = nav.Seleccionar;
                f.Seleccionar = nav.Seleccionar;
              }

            });




          }

          if (this.cFunciones.DIALOG.getDialogById("error-servidor") != undefined) {
            this.cFunciones.DIALOG.getDialogById("error-servidor")?.close();
          }


        },
        error: (err) => {

          this.ErrorServidor = true;


          if (this.cFunciones.DIALOG.getDialogById("error-servidor") == undefined) {
            this.cFunciones.DIALOG.open(DialogErrorComponent, {
              id: "error-servidor",
              data: "<b class='error'>" + err.message + "</b>",
            });
          }


        },
        complete: () => {

        }
      }
    );

  }



  ngOnInit(): void {

    this.subscription = interval(10000).subscribe(val => this.ActualizarDatosServidor())


    this.ServerScv.change.subscribe(s => {
      if (s == "CerrarForm") {
        this.dynamicForm.viewContainerRef.clear();
        this.str_formulario = "";
      }

      if (s instanceof Array) {

        if (s[0] == "CerrarModal") {
          document.getElementById(s[1])!.click();

          if (s[2] != undefined) this.ServerScv.change.emit(["DatosModal", s[1], s[2]])
        }

      }

    });

  }

  ngAfterContentInit(): void {
    this.AbrirModulo("HOME");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

}

