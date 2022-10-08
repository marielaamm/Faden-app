import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { iMedicos } from '../../../interface/i-medicos';

let  ELEMENT_DATA: iMedicos []=[];

@Component({
  selector: 'app-registros-medicos',
  templateUrl: './registros-medicos.component.html',
  styleUrls: ['./registros-medicos.component.scss']
})

export class RegistrosMedicosComponent implements OnInit {

  displayedColumns: string[] = ["NoMedico", "Nombre", "Especialidad", "Celular"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iMedicos>();
  private _liveAnnouncer:any;

 
  constructor() { }

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

  ngOnInit(): void {
  }

}
