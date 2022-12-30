import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iPaciente } from '../../../interface/i-paciente';
import { ExpdienteService } from '../../../service/expediente.service';
import { PacienteComponent } from '../paciente/paciente.component';

let ELEMENT_DATA: iPaciente []=[];

@Component({
  selector: 'app-expediente-registro',
  templateUrl: './expediente-registro.component.html',
  styleUrls: ['./expediente-registro.component.scss']
})
export class ExpedienteRegistroComponent implements OnInit {

  displayedColumns: string[] = ["NoExpediente", "NombreCompleto", "Identificacion", "Celular" ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iPaciente>();
  private _liveAnnouncer:any;
  private _ExpdienteService: ExpdienteService;
  private  dialogRef : MatDialogRef<PacienteComponent>;


  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {

    this._ExpdienteService = new ExpdienteService(this._Dialog);
    this._ExpdienteService.BuscarPaciente("");

    
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

  private LlenarPaciente(datos: string): void {

    let _json = JSON.parse(datos);


    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);

    _json["d"].forEach(
      (b: any) => {
        ELEMENT_DATA.push(b);
      }
    );

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);


  }



  ngOnInit(): void {

    this._ExpdienteService.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "Llenar_paciente") {
          this.LlenarPaciente(s[1]);
        }

        if (s[0] == "dato_paciente_Eliminar") {
          this._ExpdienteService.BuscarPaciente("");
        }

      }
    });


  }

}
