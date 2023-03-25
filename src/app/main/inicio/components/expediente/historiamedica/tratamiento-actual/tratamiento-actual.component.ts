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

  displayedColumns: string[] = ["IdTratamiento","Tratamiento", "Dosis", "IdMedico", "Fecha", "Tipo"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iTratamientoActual>();
  private _liveAnnouncer:any;

  private IdPaciente : Number = 0;
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

      this.dialogRef.afterOpened().subscribe(s =>{
        this.dialogRef.componentInstance.IdPaciente = this.IdPaciente;
      })
    
  }

  private Llenar(datos : any)
  {
    let _json = JSON.parse(datos);


    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);

    _json["d"].forEach(
      (b: any) => {
        ELEMENT_DATA.push(b);
      }
    );

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
 console.log(ELEMENT_DATA)
  }

  ngOnInit(): void {



    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "CerrarDialog" && s[1] == "frmTratamientoActual") {
          this.dialogRef.close();
          this._ExpdienteService.BuscarTratamiento(this.IdPaciente);
        }

        if(s[0] == "Menu Expediente"){
          this.IdPaciente =  s[1];
          this._ExpdienteService.BuscarTratamiento(this.IdPaciente);
        }
        if(s[0] == "Cerrar Expediente") 
        {
          this.IdPaciente = 0
          this.dataSource.data.splice(0, this.dataSource.data.length);
        }

       
        
      }
    });


    this._ExpdienteService.change.subscribe(s => {

      if(s[0] == "Llenar_Tratamiento") this.Llenar(s[1] );


    });



    
  }


}
