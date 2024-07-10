import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogErrorComponent } from 'src/app/main/shared/components/dialog-error/dialog-error.component';
import * as printJS from 'print-js';
import { PDFDocument } from 'pdf-lib';
import { Funciones } from 'src/app/main/shared/class/cls_Funciones';
import { MatDialogRef } from '@angular/material/dialog';
import { iDatos } from 'src/app/main/shared/interface/i-Datos';
import { getImprimir } from '../../service/getImprimir.service';
import { Validacionv2 } from 'src/app/main/shared/class/validacionV2';
import { IgxComboComponent, OverlaySettings } from 'igniteui-angular';
import { iPaciente } from '../../interface/i-paciente';
import { WaitComponent } from 'src/app/main/shared/components/wait/wait.component';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  public val = new Validacionv2();
  public overlaySettings: OverlaySettings = {};
  lstPaciente: any[] = [];


  
  constructor(private cFunciones : Funciones, private GET : getImprimir) { 

    this.val.add("cmbReporte", "1", "LEN>", "0", "Reporte", "Seleccione un reporte.");
    this.val.add("txtFecha1", "1", "LEN>=", "0", "Reporte", "");
    this.val.add("txtFecha2", "1", "LEN>=", "0", "Reporte", "");
    this.val.add("cmbExpediente", "1", "LEN>", "0", "Reporte", "");
    

    this.val.Get("txtFecha1").disable();
    this.val.Get("txtFecha2").disable();

    this.v_CargarDatos();

    
  }



   

  @ViewChild("cmbExpediente", { static: false })
  public cmbExpediente: IgxComboComponent;

  public v_Select_Expediente(event: any) {

    if (event.added.length == 1) {
      if(event.newSelection.length > 1) event.newSelection.splice(0, 1);
      this.val.Get("cmbExpediente").setValue(event.added);
      if(window.innerWidth <= this.cFunciones.TamanoPantalla("md")) this.cmbExpediente.close();
    }
  }

  public v_Enter_Expediente(event: any) {
    if (event.key == "Enter") {
      let cmb : any = this.cmbExpediente.dropdown;
      let _Item: iPaciente = cmb._focusedItem.value;
      this.cmbExpediente.setSelectedItem(_Item.NoExpediente);
      this.val.Get("cmbExpediente").setValue([_Item.NoExpediente]);

    }
  }



  

  public v_Reporte(){

    this.cmbExpediente.deselectAllItems();

    this.val.Get("cmbExpediente").disable();
    this.val.Get("txtFecha1").disable();
    this.val.Get("txtFecha2").disable();

    this.val.replace("txtFecha1", "1", "LEN>=", "0", "");
    this.val.replace("txtFecha2", "1", "LEN>=", "0", "");
    this.val.replace("cmbExpediente", "1", "LEN>=", "0", "");

    if(this.val.Get("cmbReporte").value == "1")
    {
      this.val.Get("cmbExpediente").enable();

      this.val.replace("cmbExpediente", "1", "LEN>", "0", "Seleccione un expediente");
    }


    if(this.val.Get("cmbReporte").value == "4") 
    {
      this.val.Get("txtFecha1").enable();
      this.val.Get("txtFecha2").enable();

      this.val.replace("txtFecha1", "1", "LEN>", "0", "Ingrese una fecha de inicio");
      this.val.replace("txtFecha2", "1", "LEN>", "0", "Ingrese una fecha de final");
    }

  }


  public v_Imprimir(): void {

    
    this.val.EsValido();


    if (this.val.Errores != "") {
      this.cFunciones.DIALOG.open(DialogErrorComponent, {
        data: this.val.Errores,
      });

      return;
    }


    document.getElementById("btn-reporte")?.setAttribute("disabled", "disabled");



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

    

    this.GET.Imprimir(this.val.Get("cmbReporte").value, this.val.Get("txtFecha1").value, this.val.Get("txtFecha2").value, this.val.Get("cmbExpediente").value[0]).subscribe(
      {
        next: (s) => {

          dialogRef.close();
          let _json: any = JSON.parse(s);


          if (_json["esError"] == 1) {
            if (this.cFunciones.DIALOG.getDialogById("error-servidor-msj") == undefined) {
              this.cFunciones.DIALOG.open(DialogErrorComponent, {
                id: "error-servidor-msj",
                data: _json["msj"].Mensaje,
              });
            }
          } else {

            this.printPDFS(_json["d"].d);

            
    
          }

        },
        error: (err) => {
          dialogRef.close();
          document.getElementById("btn-reporte")?.removeAttribute("disabled");
          if (this.cFunciones.DIALOG.getDialogById("error-servidor") == undefined) {
            this.cFunciones.DIALOG.open(DialogErrorComponent, {
              id: "error-servidor",
              data: "<b class='error'>" + err.message + "</b>",
            });
          }
        },
        complete: () => {
          document.getElementById("btn-reporte")?.removeAttribute("disabled");
        }
      }
    );

  }



  async printPDFS(datos: any) {

   
    let byteArray = new Uint8Array(atob(datos).split('').map(char => char.charCodeAt(0)));

    var file = new Blob([byteArray], { type: 'application/pdf' });

    let url = URL.createObjectURL(file);

    let tabOrWindow : any = window.open(url, '_blank');
    tabOrWindow.focus();


  }
      




  public v_CargarDatos(): void {

    document.getElementById("btn-reporte")?.setAttribute("disabled", "disabled");



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



    this.GET.BuscarPaciente().subscribe(
      {
        next: (data) => {

        
          dialogRef.close();
          let _json: any = JSON.parse(data);

          if (_json["esError"] == 1) {
            if (this.cFunciones.DIALOG.getDialogById("error-servidor-msj") == undefined) {
              this.cFunciones.DIALOG.open(DialogErrorComponent, {
                id: "error-servidor-msj",
                data: _json["msj"].Mensaje,
              });
            }
          } else {

           
            this.lstPaciente = _json["d"];

          }

        },
        error: (err) => {

          
          dialogRef.close();
          document.getElementById("btn-reporte")?.removeAttribute("disabled");
          if (this.cFunciones.DIALOG.getDialogById("error-servidor") == undefined) {
            this.cFunciones.DIALOG.open(DialogErrorComponent, {
              id: "error-servidor",
              data: "<b class='error'>" + err.message + "</b>",
            });
          }

        },
        complete: () => {
          document.getElementById("btn-reporte")?.removeAttribute("disabled");


        }
      }
    );


  }

  

  ngDoCheck(){


 
    this.val.addFocus("txtFecha1", "txtFecha2", undefined);
    this.val.addFocus("txtFecha2", "btn-reporte", "click");

     
 }





  ngOnInit(): void {

    
 
  }

}
