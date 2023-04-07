import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iExamenClinico } from '../../../../interface/i-examen-clinico';
import { NuevoExamenClinicoComponent } from './nuevo-examen-clinico/nuevo-examen-clinico.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { DialogoConfirmarComponent } from 'src/app/main/shared/components/dialogo-confirmar/dialogo-confirmar.component';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';

let ELEMENT_DATA: iExamenClinico[]=[];

@Component({
  selector: 'app-examen-clinico',
  templateUrl: './examen-clinico.component.html',
  styleUrls: ['./examen-clinico.component.scss']
})
export class ExamenClinicoComponent implements OnInit {

  displayedColumns: string[] = ["IdExamenClinico","Descripcion", "Fecha", "TipoExamen", "Accion"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iExamenClinico>();
  private _liveAnnouncer:any;

  private IdPaciente : Number = 0;
  private dialogRef: MatDialogRef<NuevoExamenClinicoComponent>;

  private _ExpdienteService: ExpdienteService;
  
  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {
 
    this._ExpdienteService = new ExpdienteService(this._Dialog);
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
  

  f_Agregar_Fila() : void{

    this.dialogRef = this._Dialog.open(NuevoExamenClinicoComponent,
      {
        disableClose: true,
        panelClass: 'custom-modal'
      })

      this.dialogRef.afterOpened().subscribe(s =>{
        this.dialogRef.componentInstance.IdPaciente = this.IdPaciente;
      })
    
  }

  private Llenar(datos : any)
  {
    let _json = JSON.parse(datos);


    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);

    ELEMENT_DATA =  _json["d"];

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  }

  public v_Editar(Fila : iExamenClinico): void
  {
    this.dialogRef = this._Dialog.open(NuevoExamenClinicoComponent,
      {
        disableClose: true,
        panelClass: 'custom-modal'
      })

      this.dialogRef.afterOpened().subscribe(s =>{
        this.dialogRef.componentInstance.rdTipo = Fila.TipoExamen;
        this.dialogRef.componentInstance.val.ValForm.get("txtDescripcion")?.setValue(Fila.Descripcion);
        this.dialogRef.componentInstance.val.ValForm.get("txtFecha")?.setValue(Fila.Fecha);
        this.dialogRef.componentInstance.ID = Fila.IdExamenClinico;
        this.dialogRef.componentInstance.IdPaciente = this.IdPaciente;
      })
  
  }

  public v_Eliminar(Fila : iExamenClinico): void
  {

    let dialogo : MatDialogRef<DialogoConfirmarComponent> = this._Dialog.open(DialogoConfirmarComponent, { disableClose: true })

    dialogo.componentInstance.titulo = "Eliminar Registro";
    dialogo.componentInstance.mensaje = "Eliminar";

   if(Fila.TipoExamen  == 1) dialogo.componentInstance.texto =  "<b>" +  Fila.Descripcion + "<br>Marcador<br><br></b>";
   if(Fila.TipoExamen  == 2) dialogo.componentInstance.texto =  "<b>" +Fila.Descripcion + "<br>Esdudio<br><br></b>";
   if(Fila.TipoExamen  == 3) dialogo.componentInstance.texto =  "<b>" +Fila.Descripcion + "<br>Imagen<br><br></b>" ;



    dialogo.afterClosed().subscribe(s=>{

      if(dialogo.componentInstance.retorno=="1"){
       this._ExpdienteService.EliminarExamenClinico(Fila.IdExamenClinico);

      }
      
    });
  }


  ngOnInit(): void {



    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "CerrarDialog" && s[1] == "frmExamenClinico") {
          this.dialogRef.close();
          this._ExpdienteService.BuscarExamenClinico(this.IdPaciente);
        }

        if(s[0] == "Menu Expediente"){
          this.IdPaciente =  s[1];
          this._ExpdienteService.BuscarExamenClinico(this.IdPaciente);
        }
        if(s[0] == "Cerrar Expediente") 
        {
          this.IdPaciente = 0
          this.dataSource.data.splice(0, this.dataSource.data.length);
        }

       
        
      }
    });


    this._ExpdienteService.change.subscribe(s => {

      if(s[0] == "Llenar_Examen_Clinico") this.Llenar(s[1] );


      if (s[0] == "dato_Examen_Clinico_Eliminar") {

        if (s[1] == undefined) {

          let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + "error al guardar" + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
          let _json = JSON.parse(s);
          this._Dialog.open(DialogoComponent, {
            data: _json["msj"]
          });
          return;
        }


        this._Dialog.open(DialogoComponent, {
          data: s[1]["msj"]
        });

        this._ExpdienteService.BuscarExamenClinico(this.IdPaciente);
        
      }


    });


    

    
  }

}
