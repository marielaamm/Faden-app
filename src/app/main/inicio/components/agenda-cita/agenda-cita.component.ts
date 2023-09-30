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


  constructor() {
    this.val.add("cmbPaciente", "1", "LEN>", "0");
    this.val.add("cmbMedico", "1", "LEN>", "0");
    this.val.add("txtEspecialidad", "1", "LEN>", "0");
    this.val.add("txtFecha", "1", "LEN>", "0");
    this.val.add("txtHora1", "1", "LEN>", "0");
    this.val.add("txtHora2", "1", "LEN>", "0");
    this.val.add("txtObservaciones", "1", "LEN>=", "0");
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
      this.val.ValForm.get("cmbPaciente")?.setValue([_Item.NombreCompleto]);

    }
  }



  
  @ViewChild("cmbMedico", { static: false })
  public cmbMedico: IgxComboComponent;

  public v_Select_Medico(event: any) {
    if (event.added.length) {
      event.newSelection = event.added;
      this.val.ValForm.get("cmbMedico")?.setValue([event.added]);
    }
  }

  public v_Enter_Medico(event: any) {
    if (event.key == "Enter") {
      let _Item: iMedicos = this.cmbPaciente.dropdown.focusedItem.value;
      this.cmbPaciente.setSelectedItem(_Item.NoMedico);
      this.val.ValForm.get("cmbMedico")?.setValue([_Item.NombreCompleto]);

    }
  }


  public v_Guardar() : void{

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
