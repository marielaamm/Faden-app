import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Validacionv2 } from 'src/app/main/shared/class/validacionV2';
import { iAgendaMedica } from '../../interface/i-agenda-medica';
import { MatTableDataSource } from '@angular/material/table';
import { Funciones } from 'src/app/main/shared/class/cls_Funciones';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { AgendaCitaComponent } from '../agenda-cita/agenda-cita.component';
import { MatDialogRef } from '@angular/material/dialog';
import { getAgendaCita } from '../../service/getAgenda.service';

@Component({
  selector: 'app-agenda-cita-reg',
  templateUrl: './agenda-cita-reg.component.html',
  styleUrls: ['./agenda-cita-reg.component.scss']
})
export class AgendaCitaRegComponent implements OnInit {

  public val = new Validacionv2();
  displayedColumns: string[] = ["col1"];
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
 
 
  
  public lstCita : MatTableDataSource<any>;
 

  constructor(private GET: getAgendaCita, private cFunciones : Funciones
  ) {

    this.val.add("txtFecha1", "1", "LEN>", "0", "Fecha Inicio", "Seleccione una fecha de inicio.");
    this.val.add("txtFecha2", "1", "LEN>", "0", "Fecha Final", "Seleccione una fecha final.");
    this.val.add("txtBuscar-Cita", "1", "LEN>=", "0", "Buscar", "");

    this.val.Get("txtFecha1").setValue(this.cFunciones.DateFormat((new Date(this.cFunciones.FechaServer.getFullYear(), 0, 1)), "yyyy-MM-dd"));
    this.val.Get("txtFecha2").setValue(this.cFunciones.DateFormat(this.cFunciones.FechaServer, "yyyy-MM-dd"));

    this.v_CargarDatos();

  }


  public v_CargarDatos(): void {

    document.getElementById("btnRefrescar-RegCita")?.setAttribute("disabled", "disabled");




    this.GET.Get(this.val.Get("txtFecha1").value, this.val.Get("txtFecha2").value).subscribe(
      {
        next: (data) => {

          let _json: any = JSON.parse(data);

          if (_json["esError"] == 1) {
            if (this.cFunciones.DIALOG.getDialogById("error-servidor-msj") == undefined) {
              this.cFunciones.DIALOG.open(DialogoComponent, {
                id: "error-servidor-msj",
                data: _json["msj"].Mensaje,
              });
            }
          } else {

            this.lstCita = new MatTableDataSource(_json["d"]);
            this.lstCita.paginator = this.paginator;
         

          
          }

        },
        error: (err) => {

          document.getElementById("btnRefrescar-RegCita")?.removeAttribute("disabled");

     
          if(this.cFunciones.DIALOG.getDialogById("error-servidor") == undefined) 
          {
            this.cFunciones.DIALOG.open(DialogoComponent, {
              id: "error-servidor",
              data: "<b class='error'>" + err.message + "</b>",
            });
          }

        },
        complete: () => { 
        document.getElementById("btnRefrescar-RegCita")?.removeAttribute("disabled");
        this.lstCita.filter = this.val.Get("txtBuscar-Cita").value.trim().toLowerCase();
      }
      }
    );


  }


  public v_Filtrar(event : any){
    this.lstCita.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  public v_Editar(e : iAgendaMedica) : void{

    let dialogRef: MatDialogRef<AgendaCitaComponent> = this.cFunciones.DIALOG.open(
      AgendaCitaComponent,
      {
        panelClass: window.innerWidth < 992 ? "faden-dialog-full" : "",
        disableClose: true
      }
    );
    
       
    dialogRef.afterOpened().subscribe(s =>{
      dialogRef.componentInstance.FILA = e;
  
      dialogRef.componentInstance.v_CargarDatos();

    });

    dialogRef.afterClosed().subscribe(s =>{
      this.v_CargarDatos();
    });

   

  }


  public v_Nuevo() : void{

    let dialogRef: MatDialogRef<AgendaCitaComponent> = this.cFunciones.DIALOG.open(
      AgendaCitaComponent,
      {
        panelClass: window.innerWidth < 992 ? "faden-dialog-full" : "",
        disableClose: true
      }
    );
    
       
    dialogRef.afterOpened().subscribe(s =>{
      dialogRef.componentInstance.v_CargarDatos();

    });

    dialogRef.afterClosed().subscribe(s =>{
      this.v_CargarDatos();
    });

   

  }


  ngOnInit(): void {
    
  }


}
