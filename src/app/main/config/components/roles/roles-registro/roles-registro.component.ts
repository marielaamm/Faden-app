import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/main/shared/service/server.service';


export interface I_Rol {
  Fila : Number;
  Rol : string;
  }

  let ELEMENT_DATA: I_Rol[] = [
  
  ];
@Component({
  selector: 'app-roles-registro',
  templateUrl: './roles-registro.component.html',
  styleUrls: ['./roles-registro.component.scss']
})
export class RolesRegistroComponent implements OnInit {

 
  displayedColumns: string[] = ['Fila', 'Rol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<I_Rol>();
  private _liveAnnouncer: any;

  
  constructor(private ServerScv : ServerService) { }



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

    this.ServerScv.change.emit(["CerrarModal", "modal-registro-roles", 1]);
  }


   Cerrar() : void{
    this.ServerScv.change.emit(["CerrarModal", "modal-registro-roles", undefined]);
      
  }

  ngOnInit(): void {
  }

}
