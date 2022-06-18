import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iMunicipio } from '../../../interface/i-municipio';


let ELEMENT_DATA: iMunicipio[] =[];

@Component({
  selector: 'app-municipio-registro',
  templateUrl: './municipio-registro.component.html',
  styleUrls: ['./municipio-registro.component.scss']
})
export class MunicipioRegistroComponent implements OnInit {

  displayedColumns: string[] = ['IdMunicipio','Municipio'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iMunicipio>();
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

  Editar() : void{
    this.ServerScv.change.emit(["CerrarModal","modal-registro-municipio", 1]);
  }

  cerrar() : void {
    this.ServerScv.change.emit(["CerrarModal", "modal-registro-municipio", undefined]);
  }
  ngOnInit(): void {
  }

}
