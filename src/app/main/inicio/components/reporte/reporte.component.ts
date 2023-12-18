import { Component, OnInit } from '@angular/core';
import { DialogErrorComponent } from 'src/app/main/shared/components/dialog-error/dialog-error.component';
import * as printJS from 'print-js';
import { PDFDocument } from 'pdf-lib';
import { Funciones } from 'src/app/main/shared/class/cls_Funciones';
import { MatDialogRef } from '@angular/material/dialog';
import { iDatos } from 'src/app/main/shared/interface/i-Datos';
import { getImprimir } from '../../service/getImprimir.service';
import { Validacionv2 } from 'src/app/main/shared/class/validacionV2';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  public val = new Validacionv2();
  
  constructor(private cFunciones : Funciones, private GET : getImprimir) { 

    this.val.add("cmbReporte", "1", "LEN>", "0", "Reporte", "Seleccione un reporte.");
  }




  public v_Imprimir(): void {

    
    this.val.EsValido();


    if (this.val.Errores != "") {
      this.cFunciones.DIALOG.open(DialogErrorComponent, {
        data: this.val.Errores,
      });

      return;
    }


    this.GET.Imprimir(this.val.Get("cmbReporte").value).subscribe(
      {
        next: (s) => {


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



  async printPDFS(datos: any) {

   
    let byteArray = new Uint8Array(atob(datos).split('').map(char => char.charCodeAt(0)));

    var file = new Blob([byteArray], { type: 'application/pdf' });

    let url = URL.createObjectURL(file);

    let tabOrWindow : any = window.open(url, '_blank');
    tabOrWindow.focus();


  }
      







  ngOnInit(): void {
  }

}
