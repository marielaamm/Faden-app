import { Component, OnInit, ViewChild } from "@angular/core";
import { iMedicos } from "src/app/main/cat/interface/i-medicos";
import { Validacionv2 } from "src/app/main/shared/class/validacionV2";
import { iPaciente } from "../../interface/i-paciente";
import { GlobalPositionStrategy, IgxComboComponent, OverlaySettings, scaleInCenter, scaleOutCenter } from "igniteui-angular";
import { getAgendaCita } from "../../service/getAgenda.service";
import { Funciones } from "src/app/main/shared/class/cls_Funciones";
import { DialogoComponent } from "src/app/main/shared/components/dialogo/dialogo.component";
import { iAgendaMedica } from "../../interface/i-agenda-medica";
import { postAgendaCita } from "../../service/posAgenda.service";
import { WaitComponent } from "src/app/main/shared/components/wait/wait.component";

@Component({
  selector: 'app-agenda-cita',
  templateUrl: './agenda-cita.component.html',
  styleUrls: ['./agenda-cita.component.scss']
})
export class AgendaCitaComponent implements OnInit {

  public val = new Validacionv2();
  public lstMedico: iMedicos[] = [];
  public lstPaciente: iPaciente[] = [];
  public FILA : iAgendaMedica = {} as iAgendaMedica;
  public Estado : String = "";

  public overlaySettings: OverlaySettings = {};
  private isLoad : boolean = false;
  public EsNuevo : boolean = true;



  constructor(private cFunciones : Funciones, private GET : getAgendaCita, private POST : postAgendaCita) {
    this.val.add("cmbPaciente", "1", "LEN>", "0", "Paciente", "Seleccione un paciente.");
    this.val.add("cmbMedico", "1", "LEN>", "0", "Medico", "Seleccione un medico.");
    this.val.add("txtEspecialidad", "1", "LEN>", "0", "Especialidad", "El medico no tiene definida una especialidad");
    this.val.add("txtFecha", "1", "LEN>", "0", "", "Seleccione una fecha.");
    this.val.add("txtHora1", "1", "LEN>", "0", "Hora Inicio", "Seleccione una opción.");
    this.val.add("txtHora2", "1", "LEN>", "0", "Hora Fin", "Seleccione una opción.");
    this.val.add("txtObservaciones", "1", "LEN>=", "0", "", "");

    this.v_CargarDatos();
    this.v_Evento("Iniciar");
    
  }


  public v_Evento(e: string): void {
    switch (e) {
      case "Iniciar":
        this.v_Evento("Limpiar");


        break;

      case "Limpiar":

        this.FILA.IdAgenda = -1;
        this.val.ValForm.get("cmbPaciente")?.setValue("");
        this.cmbPaciente?.setSelectedItem([]);
        this.val.ValForm.get("cmbMedico")?.setValue("");
        this.cmbMedico?.setSelectedItem([]);
        this.val.ValForm.get("txtFecha")?.setValue(this.cFunciones.ShortFechaServidor());
        this.val.ValForm.get("txtEspecialidad")?.setValue("");
        this.val.ValForm.get("txtHora1")?.setValue("");
        this.val.ValForm.get("txtHora2")?.setValue("");
        this.val.ValForm.get("txtObservaciones")?.setValue("");

        this.val.ValForm.get("txtEspecialidad")?.disable();
      
        break;
    }
  }







  @ViewChild("cmbPaciente", { static: false })
  public cmbPaciente: IgxComboComponent;

  public v_Select_Paciente(event: any) {

    if (event.added.length == 1)  {
      if(event.oldSelection[0] != event.added[0]) event.newSelection =   event.added;
      this.val.ValForm.get("cmbPaciente")?.setValue([event.added]);
    }
  }

  public v_Enter_Paciente(event: any) {
    if (event.key == "Enter") {
      let cmb : any = this.cmbPaciente.dropdown;
      let _Item: iPaciente = cmb._focusedItem.value;
      this.cmbPaciente.setSelectedItem(_Item);
      this.val.ValForm.get("cmbPaciente")?.setValue([_Item?.IdPaciente]);


    }
  }



  
  @ViewChild("cmbMedico", { static: false })
  public cmbMedico: IgxComboComponent;

  public v_Select_Medico(event: any) {

    this.val.ValForm.get("txtEspecialidad")?.setValue("");

    if (event.added.length == 1) {
      let i_Medico: iMedicos = this.lstMedico.find(f => f.IdMedico == event.added)!;
      if(event.oldSelection[0] != event.added[0]) event.newSelection =   event.added;
      this.val.ValForm.get("cmbMedico")?.setValue([event.added]);
      this.val.ValForm.get("txtEspecialidad")?.setValue(i_Medico?.Especialidad);
    }
  }

  public v_Enter_Medico(event: any) {
    if (event.key == "Enter") {
      let cmb : any = this.cmbMedico.dropdown;
      let _Item: iMedicos = cmb._focusedItem.value;
      this.cmbMedico.setSelectedItem(_Item);
      this.val.ValForm.get("cmbMedico")?.setValue([_Item?.IdMedico]);

    }
  }


  public v_CargarDatos(): void {


    document.getElementById("btnGuardar-Cita")?.setAttribute("disabled", "disabled");
    document.getElementById("btnCanclar-Cita")?.setAttribute("disabled", "disabled");





    this.GET.Datos().subscribe(
      {
        next: (data) => {


          let _json = JSON.parse(data);

          if (_json["esError"] == 1) {
            if (this.cFunciones.DIALOG.getDialogById("error-servidor-msj") == undefined) {
              this.cFunciones.DIALOG.open(DialogoComponent, {
                id: "error-servidor-msj",
                data: _json["msj"].Mensaje,
              });
            }
          } else {

            this.lstPaciente = _json.d[0];
            this.lstMedico = _json.d[1];

            if(this.FILA.IdAgenda != -1) this.V_Editar();
          }

        },
        error: (err) => {



          if (this.cFunciones.DIALOG.getDialogById("error-servidor") == undefined) {
            this.cFunciones.DIALOG.open(DialogoComponent, {
              id: "error-servidor",
              data: "<b class='error'>" + err.message + "</b>",
            });
          }

        },
        complete: () => { 
          document.getElementById("btnGuardar-Cita")?.removeAttribute("disabled");
          document.getElementById("btnCanclar-Cita")?.removeAttribute("disabled"); 
        }
      }
    );


  }




  public v_Guardar() : void{
    this.val.EsValido();


    
    if (this.val.Errores != "") {
      this.cFunciones.DIALOG.open(DialogoComponent, {
        data: this.val.Errores,
      });

      return;
    }
 
    this.V_POST();
  }

  private V_Editar(): void{
    this.isLoad = true;
    let i_Medico: iMedicos = this.lstMedico.find(f => f.IdMedico == this.FILA.IdMedico)!;



    this.val.ValForm.get("cmbPaciente")?.setValue([this.FILA.IdPaciente]);
    this.val.ValForm.get("cmbMedico")?.setValue([this.FILA.IdMedico]);
    this.val.ValForm.get("txtFecha")?.setValue(this.FILA.Fecha);
    this.val.ValForm.get("txtFecha")?.setValue(this.FILA.Fecha);
    this.val.ValForm.get("txtHora1")?.setValue(this.FILA.HoraInicio);
    this.val.ValForm.get("txtHora2")?.setValue(this.FILA.HoraFin);
    this.val.ValForm.get("txtObservaciones")?.setValue(this.FILA.Observaciones);
    this.val.ValForm.get("txtEspecialidad")?.setValue(i_Medico?.Especialidad);
    this.isLoad = false;

  }

  
  private V_POST(): void {

    this.FILA.IdPaciente = this.val.Get("cmbPaciente").value[0];
    this.FILA.IdMedico = this.val.Get("cmbMedico").value[0];
    this.FILA.Fecha = this.val.Get("txtFecha").value;
    this.FILA.HoraInicio = this.val.Get("txtHora1").value;
    this.FILA.HoraFin = this.val.Get("txtHora2").value;
    this.FILA.Observaciones = this.val.Get("txtObservaciones").value;
    

    document.getElementById("btnGuardar-Cita")?.setAttribute("disabled", "disabled");
    document.getElementById("btnCanclar-Cita")?.setAttribute("disabled", "disabled");


     


    let dialogRef : any = this.cFunciones.DIALOG.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this.cFunciones.DIALOG.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }




    this.POST.Guardar(this.FILA).subscribe(
      {
        next: (data) => {

          dialogRef.close();

          let _json = JSON.parse(data);

          if (_json["esError"] == 1) {
            if (this.cFunciones.DIALOG.getDialogById("error-servidor-msj") == undefined) {
              this.cFunciones.DIALOG.open(DialogoComponent, {
                id: "error-servidor-msj",
                data: _json["msj"].Mensaje,
              });
            }
          }
          else {


            this.cFunciones.DIALOG.open(DialogoComponent, {
              data: "<p><b class='bold'>" + _json["msj"].Mensaje + "</b></p>"
            });


            if(this.EsNuevo) this.v_Evento("Limpiar");

          }

        },
        error: (err) => {

          dialogRef.close();

          document.getElementById("btnGuardar-Cita")?.removeAttribute("disabled");
          document.getElementById("btnCanclar-Cita")?.removeAttribute("disabled");
      
          document.getElementById("btnGuardar-Asiento")?.removeAttribute("disabled");
          if (this.cFunciones.DIALOG.getDialogById("error-servidor") == undefined) {
            this.cFunciones.DIALOG.open(DialogoComponent, {
              id: "error-servidor",
              data: "<b class='error'>" + err.message + "</b>",
            });
          }
        },
        complete: () => {
          document.getElementById("btnGuardar-Cita")?.removeAttribute("disabled");
          document.getElementById("btnCanclar-Cita")?.removeAttribute("disabled");
        }
      }
    );



  }



  ngOnInit(): void {





    this.overlaySettings = {};

    if (window.innerWidth <= 992) {
      this.overlaySettings = {
        positionStrategy: new GlobalPositionStrategy({ openAnimation: scaleInCenter, closeAnimation: scaleOutCenter }),
        modal: true,
        closeOnOutsideClick: true
      };
    }

  }

}
