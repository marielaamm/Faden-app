import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { iAcompanante } from 'src/app/main/inicio/interface/i-acompanante';

let ELEMENT_DATA: iAcompanante[] = [];

@Component({
  selector: 'app-acompanante',
  templateUrl: './acompanante.component.html',
  styleUrls: ['./acompanante.component.scss']
})
export class AcompananteComponent implements OnInit {

  displayedColumns: string[] = ["IdAcpte", "NombreCompleto", "Telefono", "Correo", "Direccion", "EsAcpte", "EsCuidador", "EsPrimario", "EsSecundario"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iAcompanante>();
  private _liveAnnouncer: any;

  constructor() { }

  announceSort(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  f_Agregar_Fila(): void {
    let _Fila: iAcompanante = {} as iAcompanante;

    _Fila.NombreCompleto = "";
    _Fila.Telefono = "";
    _Fila.Direccion = "";
    _Fila.Correo = "";
    _Fila.EsAcpte = true;
    _Fila.EsCuidador = false;
    _Fila.EsPrimario = false;
    _Fila.EsSecundario = false;
    _Fila.IdPaciente = 0;

    ELEMENT_DATA.push(_Fila);
    let tempDataSource = this.dataSource as unknown as iAcompanante[]
    tempDataSource = [...tempDataSource, ...ELEMENT_DATA]
    //** TODO, COMO HACER QUE EL DATASOURCE ACTUALICE EL STATE SIN NECESIDAD DE CREAR UN NUEVO MATTABLEDATASOURCE? */
    //** TODO PARA MARIELA, VALIDAR QUE CUANDO SE AGREGO UNA FILA Y NO SE GUARDO, SE ELIMINE LA NUEVA FILA */
    this.dataSource = new MatTableDataSource(tempDataSource);
  }

  ngOnInit(): void {
  }

}
