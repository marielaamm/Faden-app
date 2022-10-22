import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iMedicos } from '../../../interface/i-medicos';
import { CatalogoService } from '../../../service/catalogo.service';
import { MedicosComponent } from '../medicos.component';

let  ELEMENT_DATA: iMedicos []=[];

@Component({
  selector: 'app-registros-medicos',
  templateUrl: './registros-medicos.component.html',
  styleUrls: ['./registros-medicos.component.scss']
})

export class RegistrosMedicosComponent implements OnInit {

  displayedColumns: string[] = ["NoMedico", "NombreCompleto", "Especialidad", "Celular", "Accion"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iMedicos>();
  private _liveAnnouncer:any;
  private _CatalogoService: CatalogoService;
  private  dialogRef : MatDialogRef<MedicosComponent>;
 
  constructor(private ServerScv: ServerService, private _Dialog: MatDialog) {

    this._CatalogoService = new CatalogoService(this._Dialog);
    this._CatalogoService.BuscarMedico("");


   }

  

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

  private LlenarMedico(datos: string): void {

    let _json = JSON.parse(datos);


    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);

    _json["d"].forEach(
      (b: any) => {
        ELEMENT_DATA.push(b);
      }
    );

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);


  }

  public EditarMedico(fila: any){
   

    this.dialogRef =this._Dialog.open(MedicosComponent, { disableClose: true })


    this.dialogRef.afterOpened().subscribe(s => {
      this.dialogRef.componentInstance.EditarMedico(fila);
    })
    
  }


  private CerrarModalMedico()
  {
   
    this.dialogRef.close();
  }
  

  ngOnInit(): void {



    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "CerrarDialog" && s[1] == "frmMedico") {
          this.CerrarModalMedico();
        }


      }
    });


    this._CatalogoService.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "Llenar_medico") {
          this.LlenarMedico(s[1]);
        }

      }
    });


  }

}
