import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iAntecedentesFamiliares } from '../../../../interface/i-antecedentes-familiares';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { NuevoAntecedenteFamiliaresComponent } from './nuevo-antecedente-familiares/nuevo-antecedente-familiares.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogoConfirmarComponent } from 'src/app/main/shared/components/dialogo-confirmar/dialogo-confirmar.component';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { iDatosExpediente } from 'src/app/main/inicio/interface/i-datos-expediente';


let ELEMENT_DATA: iAntecedentesFamiliares[]=[];

@Component({
  selector: 'app-antecedentes-familiares',
  templateUrl: './antecedentes-familiares.component.html',
  styleUrls: ['./antecedentes-familiares.component.scss']
})
export class AntecedentesFamiliaresComponent implements OnInit {

displayedColumns: string[] = ["IdAntecedente","TipoAntecedente", "Descripcion", "Accion"];
dataSource = new MatTableDataSource(ELEMENT_DATA);
clickedRows = new Set<iAntecedentesFamiliares>();
private _liveAnnouncer:any;

private IdPaciente : Number = 0;
private dialogRef: MatDialogRef<NuevoAntecedenteFamiliaresComponent>;



constructor(private ServerScv : ServerService, private _Dialog: MatDialog, private _ExpdienteService: ExpdienteService) {

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

  this.dialogRef = this._Dialog.open(NuevoAntecedenteFamiliaresComponent,
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

  
    let d : iDatosExpediente =  _json["d"];


    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);

    ELEMENT_DATA =  JSON.parse(d.AntFamiliares);

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  }

private LlenarDetalle(datos : any)
{
  let _json = JSON.parse(datos);


  ELEMENT_DATA.splice(0, ELEMENT_DATA.length);

  ELEMENT_DATA =  _json["d"];

  this.dataSource = new MatTableDataSource(ELEMENT_DATA);

}

public v_Editar(Fila : iAntecedentesFamiliares): void
{
  this.dialogRef = this._Dialog.open(NuevoAntecedenteFamiliaresComponent,
    {
      disableClose: true,
      panelClass: 'custom-modal'
    })

    this.dialogRef.afterOpened().subscribe(s =>{
      this.dialogRef.componentInstance.val.ValForm.get("txtDescripcion")?.setValue(Fila.Descripcion);
      this.dialogRef.componentInstance.val.ValForm.get("txtTipoAntecedente")?.setValue(Fila.TipoAntecedente);
      this.dialogRef.componentInstance.ID = Fila.IdAntecedente;
      this.dialogRef.componentInstance.IdPaciente = this.IdPaciente;
    })

}

public v_Eliminar(Fila : iAntecedentesFamiliares): void
{

  let dialogo : MatDialogRef<DialogoConfirmarComponent> = this._Dialog.open(DialogoConfirmarComponent, { disableClose: true })

  dialogo.componentInstance.titulo = "Eliminar Registro";
  dialogo.componentInstance.mensaje = "Eliminar";

  dialogo.componentInstance.texto =  "<b>" +Fila.TipoAntecedente + "<br>"+Fila.Descripcion+"<br><br></b>" ;


  dialogo.afterClosed().subscribe(s=>{

    if(dialogo.componentInstance.retorno=="1"){
     this._ExpdienteService.EliminarAntFamiliar(Fila.IdAntecedente);

    }
    
  });
}


ngOnInit(): void {



  this.ServerScv.change.subscribe(s => {
  
    if (s instanceof Array) {

      if (s[0] == "CerrarDialog" && s[1] == "frmAntFamiliar") {
        this.dialogRef.close();
        this._ExpdienteService.BuscarAntFamiliar(this.IdPaciente);
      }

      if(s[0] == "Menu Expediente"){
        this.IdPaciente =  s[1];

      }
      if(s[0] == "Cerrar Expediente") 
      {
        this.IdPaciente = 0
        this.dataSource.data.splice(0, this.dataSource.data.length);
      }

     
      
    }
  });


  this._ExpdienteService.change.subscribe(s => {

    if(s[0] == "Llenar_Ant_Familiar") this.LlenarDetalle(s[1] );
    if(s[0] == "Llenar_Datos_Paciente") this.Llenar(s[1] );


    if (s[0] == "dato_Ant_Familiar_Eliminar") {

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

      this._ExpdienteService.BuscarAntFamiliar(this.IdPaciente);
      
    }


  });


  

  
}

}
