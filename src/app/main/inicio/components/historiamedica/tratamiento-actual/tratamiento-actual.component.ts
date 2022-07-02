import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iTratamientoActual } from '../../../interface/i-tratamiento-actual';
;

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

  constructor(private ServerScv : ServerService) { }

  
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
    let _Fila : iTratamientoActual = {} as iTratamientoActual;

    ELEMENT_DATA.push(_Fila);
    _Fila.Tratamiento = "";
    _Fila.Dosis = "aaaa";
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
    
  }


}
