import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { GlobalPositionStrategy, IgxComboComponent, OverlaySettings, scaleInCenter, scaleOutCenter } from 'igniteui-angular';
import * as moment from 'moment';
import { Moment } from 'moment';
import { iMedicos } from 'src/app/main/cat/interface/i-medicos';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { iPaciente } from '../../interface/i-paciente';
import { Funciones } from 'src/app/main/shared/class/cls_Funciones';
import { getAgendaCita } from '../../service/agenda.service';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';





@Component({
  selector: 'app-agenda-cita',
  templateUrl: './agenda-cita.component.html',
  styleUrls: ['./agenda-cita.component.scss']
})


export class AgendaCitaComponent implements OnInit {

  public val = new Validacion();
  public lstMedico: iMedicos[] = [];
  public lstPaciente: iPaciente[] = [];

  public overlaySettings: OverlaySettings = {};

  date = new FormControl(moment());
  public Calendario: any[] = [];


  constructor(private cFunciones : Funciones, private GET : getAgendaCita) {
    this.val.add("cmbPaciente", "1", "LEN>", "0");
    this.val.add("cmbMedico", "1", "LEN>", "0");
    this.val.add("txtEspecialidad", "1", "LEN>", "0");
    this.val.add("txtFecha", "1", "LEN>", "0");
    this.val.add("txtHora1", "1", "LEN>", "0");
    this.val.add("txtHora2", "1", "LEN>", "0");
    this.val.add("txtObservaciones", "1", "LEN>=", "0");

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
    this.valTabla.EsValido();


    if (this.val.Errores != "") {
      this.cFunciones.DIALOG.open(DialogErrorComponent, {
        data: this.val.Errores,
      });

      return;
    }



    if (this.valTabla.Errores != "") {
      this.cFunciones.DIALOG.open(DialogErrorComponent, {
        data: this.valTabla.Errores,
      });

      return;
    }

    if (this.dec_Dif != 0) {
      let DilogConfirmar = this.cFunciones.DIALOG.open(DialogoConfirmarComponent, {});

      DilogConfirmar.afterOpened().subscribe(s => {
        DilogConfirmar.componentInstance.mensaje = "<span>Tiene una diferencia de: <b>" + this.cFunciones.NumFormat(this.dec_Dif, "2") + "</b><br>Desea Guardar el documento?</span>"
        DilogConfirmar.componentInstance.textBoton1 = "Si";
        DilogConfirmar.componentInstance.textBoton2 = "No";
      });


      DilogConfirmar.afterClosed().subscribe(s => {

        if (DilogConfirmar.componentInstance.retorno == "1") {
          this.V_POST();
        }

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
