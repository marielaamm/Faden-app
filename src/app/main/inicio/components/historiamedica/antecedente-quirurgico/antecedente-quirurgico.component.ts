import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iAntecedenteQuirurgico } from '../../../interface/i-antecedente-quirurgico';


let ELEMENT_DATA: iAntecedenteQuirurgico[] =[];


@Component({
  selector: 'app-antecedente-quirurgico',
  templateUrl: './antecedente-quirurgico.component.html',
  styleUrls: ['./antecedente-quirurgico.component.scss']
})
export class AntecedenteQuirurgicoComponent implements OnInit {

  displayedColumns: string[] = ["IdAntecedenteQuirurgico","Descripcion","Fecha","LugarRealizacion"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iAntecedenteQuirurgico>();
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
    let _Fila : iAntecedenteQuirurgico = {} as iAntecedenteQuirurgico;

    ELEMENT_DATA.push(_Fila);
   
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
    
  }


}
