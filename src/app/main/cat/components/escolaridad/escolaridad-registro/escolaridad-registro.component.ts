import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iEscolaridad } from '../../../interface/i-escolaridad';
import { CatalogoService } from '../../../service/catalogo.service';
import { EscolaridadComponent } from '../escolaridad.component';

let ELEMENT_DATA: iEscolaridad[] = [];

@Component({
  selector: 'app-escolaridad-registro',
  templateUrl: './escolaridad-registro.component.html',
  styleUrls: ['./escolaridad-registro.component.scss']
})
export class EscolaridadRegistroComponent implements OnInit {


  displayedColumns: string[] = ['IdEscolaridad', 'Escolaridad','Accion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iEscolaridad>();
  private _liveAnnouncer: any;
  private _CatalogoService: CatalogoService;
  private  dialogRef : MatDialogRef<EscolaridadComponent>;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) { 
    this._CatalogoService = new CatalogoService(this._Dialog);
    this._CatalogoService.BuscarEscolaridad();
   
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
 


   /*************************************************************************/
  ngOnInit(): void {
  }

  private LlenarEscolaridad (datos: string): void {
    let _json = JSON.parse(datos);


    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);

    _json["d"].forEach(
      (b: any) => {
        ELEMENT_DATA.push(b);
      }
    );

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);


  }

  public EditarEscolaridad (fila: any){
    this.dialogRef =this._Dialog.open(EscolaridadComponent, { disableClose: true })


    this.dialogRef.afterOpened().subscribe(s => {
      //this.dialogRef.componentInstance.EditarEscolaridad(fila);
    })
  }

}
