import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iTratamientoActual } from '../../../../interface/i-tratamiento-actual';
import { NuevoTratamientoActualComponent } from './nuevo-tratamiento-actual/nuevo-tratamiento-actual.component';


let ELEMENT_DATA: iTratamientoActual[] =[];

@Component({
  selector: 'app-tratamiento-actual',
  templateUrl: './tratamiento-actual.component.html',
  styleUrls: ['./tratamiento-actual.component.scss']
})
export class TratamientoActualComponent implements OnInit {

  displayedColumns: string[] = ["IdTratamiento","Tratamiento", "Dosis", "IdMedico", "Fecha", "TipoTratamiento"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iTratamientoActual>();
  private _liveAnnouncer:any;

  private dialogRef: MatDialogRef<NuevoTratamientoActualComponent>;

  private _ExpdienteService: ExpdienteService;
  
  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {
 
    this._ExpdienteService = new ExpdienteService(this._Dialog);
   }

 
  
  announceSort(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  clickRow(evento : string, row : any){
  }
  

  f_Agregar_Fila() : void{

    this.dialogRef = this._Dialog.open(NuevoTratamientoActualComponent,
      {
        disableClose: true,
        panelClass: 'custom-modal'
      })
    
  }

  ngOnInit(): void {


    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "CerrarDialog" && s[1] == "frmTratamientoActual") {
          this.dialogRef.close();
        }
      }
    });



    this._ExpdienteService.change.subscribe(

      s => {

        if (s[0] == "dato_Tratamiento_Guardar") {

          if (s[1] == undefined) {

            let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + "error al guardar" + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
            let _json = JSON.parse(s);
            this._Dialog.open(DialogoComponent, {
              data: _json["msj"]
            });
            return;
          }


          this._Dialog.open(DialogoComponent, {
            data: s[1]["msj"]
          });
  
          this.dialogRef.close();
          
        }


      }
    );

    
  }


}
