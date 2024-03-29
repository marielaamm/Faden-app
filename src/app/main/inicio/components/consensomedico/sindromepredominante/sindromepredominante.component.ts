import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { iSindromePredominante } from 'src/app/main/inicio/interface/i-sindromepredominante';
import { ServerService } from 'src/app/main/shared/service/server.service';

let ELEMENT_DATA: iSindromePredominante[]=[];

@Component({
  selector: 'app-sindromepredominante',
  templateUrl: './sindromepredominante.component.html',
  styleUrls: ['./sindromepredominante.component.scss']
})
export class SindromepredominanteComponent implements OnInit {

  public IdPaciente : Number = 0;

  displayedColumns: string[] = ["IdSindrome","TipoSindrome"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iSindromePredominante>();
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
    let _Fila : iSindromePredominante = {} as iSindromePredominante;

    _Fila.IdPaciente = this.IdPaciente;
    _Fila.TipoSindrome = "";
    
    ELEMENT_DATA.push(_Fila);
   
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
  }

}
