import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoConfirmarComponent } from 'src/app/main/shared/components/dialogo-confirmar/dialogo-confirmar.component';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { SistemaService } from '../../../service/sistema.service';
import { RolesComponent } from '../../roles/roles.component';
import { UsuarioComponent } from '../usuario.component';

export interface iUsuario{
  IdUsuario: Number,
  IdRol: Number,
  Nombre: String,
  Apellido: String;
  Usuario1: String,
  Contrasena: String,
  Activo: boolean
}


  let ELEMENT_DATA: iUsuario[] = [
  
  ];

@Component({
  selector: 'app-registrousuario',
  templateUrl: './registrousuario.component.html',
  styleUrls: ['./registrousuario.component.scss']
})
export class RegistrousuarioComponent implements OnInit {


  displayedColumns: string[] = ['Usuario1', 'Nombre', 'Rol1', 'Activo'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iUsuario>();
  private _liveAnnouncer: any;
  private _SistemaService: SistemaService;
  private dialogRef : MatDialogRef<UsuarioComponent>;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {
    this._SistemaService = new SistemaService(this._Dialog);
    this._SistemaService.BuscarUsuario(); }


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
 

  private LlenarUsuario (datos: string): void {
    let _json = JSON.parse(datos);


    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
    ELEMENT_DATA = _json["d"];

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);


  }

  public EditarUsuario (fila: any){
    this.dialogRef = this._Dialog.open(UsuarioComponent, { disableClose: true })

    this.dialogRef.afterOpened().subscribe(s => {
    this.dialogRef.componentInstance.Editar(fila);
    })
  }
 

  public EliminarUsuario (fila: any){

    let dialogo : MatDialogRef<DialogoConfirmarComponent> = this._Dialog.open(DialogoConfirmarComponent, { disableClose: true })

    dialogo.componentInstance.titulo = "Eliminar Usuario";
    dialogo.componentInstance.mensaje = "Eliminar";
    dialogo.componentInstance.texto = fila.IdRol + " " + fila.Rol1;

    dialogo.afterClosed().subscribe(s=>{

      if(dialogo.componentInstance.retorno=="1"){
        fila.Activo = false;
        this._SistemaService.GuardarUsuario(fila);
      }
      
    });

   
  }

  ngOnInit(): void {
    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "CerrarDialog" && s[1] == "frmUsuario") {
          this.dialogRef.close();
          this._SistemaService.BuscarUsuario();
        }


      }
    });


    this._SistemaService.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "Llenar_Usuario") {
          this.LlenarUsuario(s[1]);
        }


        if (s[0] == "dato_Usuario_Guardar") {

         
          if (s[1] == undefined) {
  
            let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + "error al guardar" + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
            let _json = JSON.parse(s);
            this._Dialog.open(DialogoComponent, {
              data: _json["msj"]
            });
            return;
          }
          
         
          this._SistemaService.BuscarUsuario();

      }

      }
    });

  }

}



