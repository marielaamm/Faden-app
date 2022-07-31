import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { iAcompanante } from 'src/app/main/inicio/interface/i-acompanante';

let ELEMENT_DATA: iAcompanante[] =[];

@Component({
  selector: 'app-acompanante',
  templateUrl: './acompanante.component.html',
  styleUrls: ['./acompanante.component.scss']
})
export class AcompananteComponent implements OnInit {

  displayedColumns: string[] = ["IdAcompanante","Nombre","Telefono","Correo", "Direccion","EsAcompanante", "EsCuidador","EsPrimario", "EsSecundario"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iAcompanante>();
  private _liveAnnouncer:any;

  constructor() { }

  announceSort(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  f_Agregar_Fila() : void{
    let _Fila : iAcompanante = {} as iAcompanante;

    ELEMENT_DATA.push(_Fila);
   
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
  }

}
