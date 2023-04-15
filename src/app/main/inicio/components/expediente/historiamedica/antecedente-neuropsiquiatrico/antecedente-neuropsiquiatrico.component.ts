import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { iAntecedenteNeuroPsiquiatrico } from 'src/app/main/inicio/interface/i-antecedente-neuro-psiquiatrico';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { DialogoConfirmarComponent } from 'src/app/main/shared/components/dialogo-confirmar/dialogo-confirmar.component';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { NuevoAntecedenteNeurosiquiatricoComponent } from './nuevo-antecedente-neurosiquiatrico/nuevo-antecedente-neurosiquiatrico.component';

let ELEMENT_DATA: iAntecedenteNeuroPsiquiatrico[] =[];

@Component({
  selector: 'app-antecedente-neuropsiquiatrico',
  templateUrl: './antecedente-neuropsiquiatrico.component.html',
  styleUrls: ['./antecedente-neuropsiquiatrico.component.scss']
})
export class AntecedenteNeuropsiquiatricoComponent implements OnInit {

  displayedColumns: string[] = ["IdAntNeuroPsiq","Nombre", "Vive",  "Enfermedad", "Padece", "Parentesco", "Accion"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iAntecedenteNeuroPsiquiatrico>();
  private _liveAnnouncer:any;


  private IdPaciente : Number = 0;
  private dialogRef: MatDialogRef<NuevoAntecedenteNeurosiquiatricoComponent>;

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

    this.dialogRef = this._Dialog.open(NuevoAntecedenteNeurosiquiatricoComponent,
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

  public v_Editar(Fila : iAntecedenteNeuroPsiquiatrico): void
  {
    this.dialogRef = this._Dialog.open(NuevoAntecedenteNeurosiquiatricoComponent,
      {
        disableClose: true,
        panelClass: 'custom-modal'
      })

      this.dialogRef.afterOpened().subscribe(s =>{
        this.dialogRef.componentInstance.val.ValForm.get("txtNombre")?.setValue(Fila.Nombre);
        this.dialogRef.componentInstance.val.ValForm.get("txtEnfermedad")?.setValue(Fila.Enfermedad);
        this.dialogRef.componentInstance.rdVive = Fila.Vive;
        this.dialogRef.componentInstance.rdPadece = Fila.Padece;
        this.dialogRef.componentInstance.rdParentesco = Fila.Parentesco;
        this.dialogRef.componentInstance.ID = Fila.IdAntNeuroPsiq;
        this.dialogRef.componentInstance.IdPaciente = this.IdPaciente;
      })
  
  }

  public v_Eliminar(Fila : iAntecedenteNeuroPsiquiatrico): void
  {

    let dialogo : MatDialogRef<DialogoConfirmarComponent> = this._Dialog.open(DialogoConfirmarComponent, { disableClose: true })

    dialogo.componentInstance.titulo = "Eliminar Registro";
    dialogo.componentInstance.mensaje = "Eliminar";
    dialogo.componentInstance.texto =  "<b>" +Fila.Nombre + "<br>" + Fila.Enfermedad + "<br><br></b>"


    dialogo.afterClosed().subscribe(s=>{

      if(dialogo.componentInstance.retorno=="1"){
       this._ExpdienteService.EliminarAntNeuroPsiquiatrico(Fila.IdAntNeuroPsiq);

      }
      
    });
  }


  ngOnInit(): void {



    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "CerrarDialog" && s[1] == "frmAntNeuroPsiquiatrico") {
          this.dialogRef.close();
          this._ExpdienteService.BuscarAntNeuroPsiquiatrico(this.IdPaciente);
        }

        if(s[0] == "Menu Expediente"){
          this.IdPaciente =  s[1];
          this._ExpdienteService.BuscarAntNeuroPsiquiatrico(this.IdPaciente);
        }
        if(s[0] == "Cerrar Expediente") 
        {
          this.IdPaciente = 0
          this.dataSource.data.splice(0, this.dataSource.data.length);
        }

       
        
      }
    });


    this._ExpdienteService.change.subscribe(s => {

      if(s[0] == "Llenar_Ant_NeuroPsiquiatrico") this.Llenar(s[1] );


      if (s[0] == "dato_Ant_NeuroPsiquiatrico_Eliminar") {

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

        this._ExpdienteService.BuscarAntNeuroPsiquiatrico(this.IdPaciente);
        
      }


    });


    

    
  }
}
