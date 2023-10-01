import { Component, OnInit, ViewChild } from "@angular/core";
import { iMedicos } from "src/app/main/cat/interface/i-medicos";
import { Validacionv2 } from "src/app/main/shared/class/validacionV2";
import { iPaciente } from "../../interface/i-paciente";
import { GlobalPositionStrategy, IgxComboComponent, OverlaySettings, scaleInCenter, scaleOutCenter } from "igniteui-angular";
import { getAgendaCita } from "../../service/agenda.service";
import { Funciones } from "src/app/main/shared/class/cls_Funciones";
import { DialogoComponent } from "src/app/main/shared/components/dialogo/dialogo.component";

@Component({
  selector: 'app-agenda-cita',
  templateUrl: './agenda-cita.component.html',
  styleUrls: ['./agenda-cita.component.scss']
})
export class AgendaCitaComponent implements OnInit {

  public val = new Validacionv2();
  public lstMedico: iMedicos[] = [];
  public lstPaciente: iPaciente[] = [];

  public overlaySettings: OverlaySettings = {};



  constructor(private cFunciones : Funciones, private GET : getAgendaCita) {
    this.val.add("cmbPaciente", "1", "LEN>", "0", "Paciente", "Seleccione un paciente.");
    this.val.add("cmbMedico", "1", "LEN>", "0", "Medico", "Seleccione un medico.");
    this.val.add("txtEspecialidad", "1", "LEN>", "0", "Especialidad", "El medico no tiene definida una especialidad");
    this.val.add("txtFecha", "1", "LEN>", "0", "", "Seleccione una fecha.");
    this.val.add("txtHora1", "1", "LEN>", "0", "Hora Inicio", "Seleccione una opción.");
    this.val.add("txtHora2", "1", "LEN>", "0", "Hora Fin", "eleccione una opción.");
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
    if (event.added.length) {
      event.newSelection = event.added;
      this.val.ValForm.get("cmbPaciente")?.setValue([event.added]);
    }
  }

  public v_Enter_Paciente(event: any) {
    if (event.key == "Enter") {
      let _Item: iPaciente = this.cmbPaciente.dropdown.focusedItem.value;
      this.cmbPaciente.setSelectedItem(_Item.NoExpediente);
      this.val.ValForm.get("cmbPaciente")?.setValue([_Item.NoExpediente]);

    }
  }



  
  @ViewChild("cmbMedico", { static: false })
  public cmbMedico: IgxComboComponent;

  public v_Select_Medico(event: any) {

    this.val.ValForm.get("txtEspecialidad")?.setValue("");

    if (event.added.length) {
      let i_Medico: iMedicos = this.lstMedico.find(f => f.NoMedico == event.added)!;

      event.newSelection = event.added;
      this.val.ValForm.get("cmbMedico")?.setValue([event.added]);
      this.val.ValForm.get("txtEspecialidad")?.setValue(i_Medico.Especialidad);
    }
  }

  public v_Enter_Medico(event: any) {
    if (event.key == "Enter") {
      let _Item: iMedicos = this.cmbMedico.dropdown.focusedItem.value;
      this.cmbMedico.setSelectedItem(_Item.NoMedico);
      this.val.ValForm.get("cmbMedico")?.setValue([_Item.NoMedico]);

    }
  }


  public v_CargarDatos(): void {


    document.getElementById("btnRefrescar-Asiento")?.setAttribute("disabled", "disabled");





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
          }

        },
        error: (err) => {


          document.getElementById("btnGuardar-Cita")?.removeAttribute("disabled");
        

          if (this.cFunciones.DIALOG.getDialogById("error-servidor") == undefined) {
            this.cFunciones.DIALOG.open(DialogoComponent, {
              id: "error-servidor",
              data: "<b class='error'>" + err.message + "</b>",
            });
          }

        },
        complete: () => { document.getElementById("btnGuardar-Cita")?.removeAttribute("disabled"); }
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
