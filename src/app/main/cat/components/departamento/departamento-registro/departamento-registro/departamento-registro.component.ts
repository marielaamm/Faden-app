import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { iDepartamento } from 'src/app/main/cat/interface/i-departamento';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { DepartamentoComponent } from '../../departamento.component';

let ELEMENT_DATA: iDepartamento[] = [];

@Component({
  selector: 'app-departamento-registro',
  templateUrl: './departamento-registro.component.html',
  styleUrls: ['./departamento-registro.component.scss']
})
export class DepartamentoRegistroComponent implements OnInit {

  displayedColumns: string[] = ['IdDepartamento', 'Departamento', 'Accion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iDepartamento>();
  private _liveAnnouncer: any;
  private _CatalogoService: CatalogoService;
  private  dialogRef : MatDialogRef<DepartamentoRegistroComponent>;


  constructor(private ServerScv : ServerService,private _Dialog: MatDialog) { }

  

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

  private LlenarDepartamento(datos: string): void {

    let _json = JSON.parse(datos);


    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);

    _json["d"].forEach(
      (b: any) => {
        ELEMENT_DATA.push(b);
      }
    );

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);


  }


  public EditarDepartamento(fila: any){
   

    this.dialogRef =this._Dialog.open(DepartamentoRegistroComponent, { disableClose: true })


    this.dialogRef.afterOpened().subscribe(s => {
      this.dialogRef.componentInstance.EditarDepartamento(fila);
    })
    
  }


   /*************************************************************************/
   Editar() : void{

    this.ServerScv.change.emit(["CerrarModal", "modal-registro-departamento", 1]);
  }


   Cerrar() : void{
    this.ServerScv.change.emit(["CerrarModal", "modal-registro-departamento", undefined]);
      
  }

  private CerrarModalDepartamento()
  {
   
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "CerrarDialog" && s[1] == "frmDepartamento") {
          this.CerrarModalDepartamento();
        }


      }
    });


    this._CatalogoService.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "Llenar_Departamento") {
          this.LlenarDepartamento(s[1]);
        }

        //if (s[0] == "dato_Departamento_Eliminar") {
          //this._CatalogoService.GuardarDepartamento(Departamento);
        //}

      }
    });

  }

}
