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

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface ICalendar {
  D: boolean
  D_dia: number,
  L: boolean;
  L_dia: number,
  Ma: boolean,
  Ma_dia: number,
  Mi: boolean,
  Mi_dia: number,
  J: boolean,
  J_dia: number,
  V: boolean,
  V_dia: number,
  S: boolean
  S_dia: number,
}


@Component({
  selector: 'app-agenda-cita',
  templateUrl: './agenda-cita.component.html',
  styleUrls: ['./agenda-cita.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class AgendaCitaComponent implements OnInit {

  public val = new Validacion();
  public lstMedico: iMedicos[] = [];

  public overlaySettings: OverlaySettings = {};

  date = new FormControl(moment());
  public Calendario: any[] = [];


  constructor() {
    this.val.add("cmbMedico", "1", "LEN>", "0");
    this.val.add("txtFecha", "1", "LEN>", "0");
  }


  public LlenarCalendario()
  {

    
    this.Calendario.splice(0, this.Calendario.length);
   
    let Fecha : Date = new Date(this.val.ValForm.get("txtFecha")?.value) ;
    let anio = Fecha.getFullYear();
    let mes = Fecha.getMonth() - 1;
    let FinLinea : boolean = false;


    var diasMes = new Date(anio, mes, 0).getDate();

    let c: ICalendar = {} as ICalendar;


    for (var dia = 1; dia <= diasMes; dia++) {

      this.val.add("chk" + dia, "1", "LEN>=", "0");

      var indice = new Date(anio, mes - 1, dia).getDay();

      switch (indice) {

        case 0:
          c.D = false;
          c.D_dia = dia;
          
          break;
        case 1:
          c.L = false;
          c.L_dia = dia;
          break;
        case 2:
          c.Ma = false;
          c.Ma_dia = dia;
          break;
        case 3:
          c.Mi = false;
          c.Mi_dia = dia;
          break;
        case 4:
          c.J = false;
          c.J_dia = dia;
          break;
        case 5:
          c.V = false;
          c.V_dia = dia;
          break;
        case 6:
          c.S = false;
          c.S_dia = dia;
          FinLinea = true;
          break;


      }
 
      if(FinLinea){
        FinLinea = false;
       
        this.Calendario.push(c);
        c = {} as ICalendar;
      }


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
      let _Item: iMedicos = this.cmbMedico.dropdown.focusedItem.value;
      this.cmbMedico.setSelectedItem(_Item.NoMedico);
      this.val.ValForm.get("cmbMedico")?.setValue([_Item.NoMedico]);

    }
  }



  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.val.ValForm.get("txtFecha")?.setValue(ctrlValue);
    datepicker.close();

    this.LlenarCalendario()
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
