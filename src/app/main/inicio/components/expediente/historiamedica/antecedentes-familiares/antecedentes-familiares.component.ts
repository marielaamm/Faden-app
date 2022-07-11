import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iAntecedentesFamiliares } from '../../../../interface/i-antecedentes-familiares';


let ELEMENT_DATA: iAntecedentesFamiliares[]=[];

@Component({
  selector: 'app-antecedentes-familiares',
  templateUrl: './antecedentes-familiares.component.html',
  styleUrls: ['./antecedentes-familiares.component.scss']
})
export class AntecedentesFamiliaresComponent implements OnInit {

displayedColumns: string[] = ["IdAntecedente","TipoAntecedente", "Descripcion"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iAntecedentesFamiliares>();
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
    let _Fila : iAntecedentesFamiliares = {} as iAntecedentesFamiliares;

    ELEMENT_DATA.push(_Fila);
   
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
    
  }


}
