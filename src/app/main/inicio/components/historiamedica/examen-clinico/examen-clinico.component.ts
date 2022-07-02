import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iExamenClinico } from '../../../interface/i-examen-clinico';

let ELEMENT_DATA: iExamenClinico[]=[];

@Component({
  selector: 'app-examen-clinico',
  templateUrl: './examen-clinico.component.html',
  styleUrls: ['./examen-clinico.component.scss']
})
export class ExamenClinicoComponent implements OnInit {

  displayedColumns: string[] = ["IdExamenClinico","Descripcion", "Fecha", "TipoExamen"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iExamenClinico>();
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
    let _Fila : iExamenClinico = {} as iExamenClinico;

    ELEMENT_DATA.push(_Fila);
   
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
    
  }


}
