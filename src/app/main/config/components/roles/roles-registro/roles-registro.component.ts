import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoConfirmarComponent } from 'src/app/main/shared/components/dialogo-confirmar/dialogo-confirmar.component';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { SistemaService } from '../../../service/sistema.service';
import { RolesComponent } from '../roles.component';


export interface I_Rol {
  IdRol : Number;
  Rol1 : string;
  Activo : Boolean;
  }

  let ELEMENT_DATA: I_Rol[] = [
  
  ];
@Component({
  selector: 'app-roles-registro',
  templateUrl: './roles-registro.component.html',
  styleUrls: ['./roles-registro.component.scss']
})
export class RolesRegistroComponent implements OnInit {

 
  displayedColumns: string[] = ['IdRol', 'Rol1','Activo'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<I_Rol>();
  private _liveAnnouncer: any;
  private _SistemaService: SistemaService;
  private  dialogRef : MatDialogRef<RolesComponent>;
  private Acceso : any[];

  
  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) { 
    this._SistemaService = new SistemaService(this._Dialog);
    this._SistemaService.BuscarRol();
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
 

  private LlenarRol (datos: string): void {
    let _json = JSON.parse(datos);


    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
    ELEMENT_DATA = _json["d"][0];
    this.Acceso = _json["d"][1];

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);


  }

  public EditarRol (fila: any){
    this.dialogRef =this._Dialog.open(RolesComponent, { disableClose: true })

    fila.Acceso = this.Acceso.filter(f => f.IdRol == fila.IdRol);


    this.dialogRef.afterOpened().subscribe(s => {
      this.dialogRef.componentInstance.EditarRol(fila);
    })
  }
 

  public EliminarRol (fila: any){

    let dialogo : MatDialogRef<DialogoConfirmarComponent> = this._Dialog.open(DialogoConfirmarComponent, { disableClose: true })

    dialogo.componentInstance.titulo = "Eliminar Registro";
    dialogo.componentInstance.mensaje = "Eliminar";
    dialogo.componentInstance.texto = fila.IdRol + " " + fila.Rol1;

    dialogo.afterClosed().subscribe(s=>{

      if(dialogo.componentInstance.retorno=="1"){
        fila.Activo = false;
        this._SistemaService.GuardarRol(fila);
      }
      
    });

   
  }


  ngOnInit(): void {
    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "CerrarDialog" && s[1] == "frmRoles") {
          this.dialogRef.close();
          this._SistemaService.BuscarRol();
        }


      }
    });


    this._SistemaService.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "Llenar_Rol") {
          this.LlenarRol(s[1]);
        }


        if (s[0] == "dato_Rol_Guardar") {

         
          if (s[1] == undefined) {
  
            let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + "error al guardar" + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
            let _json = JSON.parse(s);
            this._Dialog.open(DialogoComponent, {
              data: _json["msj"]
            });
            return;
          }
          
         
          this._SistemaService.BuscarRol();

      }

      }
    });

  }
  

}
