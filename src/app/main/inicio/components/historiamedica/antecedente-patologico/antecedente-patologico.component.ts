import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iAntecedentePatologico } from '../../../interface/i-antecedente-patologico';

let ELEMENT_DATA: iAntecedentePatologico[] =[];

@Component({
  selector: 'app-antecedente-patologico',
  templateUrl: './antecedente-patologico.component.html',
  styleUrls: ['./antecedente-patologico.component.scss']
})
export class AntecedentePatologicoComponent implements OnInit {

  displayedColumns: string[] = ["IdAntecedentePatologico","Enfermedad", "Descripcion"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iAntecedentePatologico>();
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
    let _Fila : iAntecedentePatologico = {} as iAntecedentePatologico;

    ELEMENT_DATA.push(_Fila);
   
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
    
  }


}
