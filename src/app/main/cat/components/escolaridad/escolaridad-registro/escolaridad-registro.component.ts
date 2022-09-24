import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iEscolaridad } from '../../../interface/i-escolaridad';

let ELEMENT_DATA: iEscolaridad[] = [];

@Component({
  selector: 'app-escolaridad-registro',
  templateUrl: './escolaridad-registro.component.html',
  styleUrls: ['./escolaridad-registro.component.scss']
})
export class EscolaridadRegistroComponent implements OnInit {

 


  displayedColumns: string[] = ['IdEscolaridad', 'Escolaridad'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iEscolaridad>();
  private _liveAnnouncer: any;

  constructor(private ServerScv : ServerService) { 
   
  }


  /*************************EVENTOS TABLA************************************/

  
  /** Announce the change in sort state for assistive technology. */
  announceSort(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
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

   /*************************************************************************/
   Editar() : void{

    this.ServerScv.change.emit(["CerrarModal", "modal-registro-escolaridad", 1]);
  }

   Cerrar() : void{
    this.ServerScv.change.emit(["CerrarModal", "modal-registro-escolaridad", undefined]);
      
  }
  ngOnInit(): void {
  }

}
