import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iPaciente } from '../../../interface/i-paciente';
import { ExpdienteService } from '../../../service/expediente.service';
import { PacienteComponent } from '../paciente/paciente.component';

@Component({
  selector: 'app-expediente-registro',
  templateUrl: './expediente-registro.component.html',
  styleUrls: ['./expediente-registro.component.scss']
})
export class ExpedienteRegistroComponent implements OnInit {

  lstPaciente : any[] = [];
  public lstFilter: any[] = [];

  
  private LstAcompanante : any[] ;


  constructor(private ServerScv : ServerService, private _Dialog: MatDialog, private _ExpdienteService: ExpdienteService,
    public dialogRef: MatDialogRef<PacienteComponent>,) {

    this._ExpdienteService.BuscarPaciente();

    
   }




  private LlenarPaciente(datos: string): void {

    let _json = JSON.parse(datos);



    this.lstPaciente = _json["d"][0];
    this.LstAcompanante = _json["d"][1];

    this.lstFilter = this.lstPaciente.map((obj : any) => ({...obj}));

  }

  public v_Seleccionar(e : any) : void{

    
    let Acompanante : any[] = this.LstAcompanante.filter((w : any) => w.IdPaciente == e.IdPaciente)

  this.ServerScv.change.emit(["CerrarDialog","frmRegistroPaciente", [e , Acompanante]]);
  this._ExpdienteService.BuscarDatosPaciente(e.IdPaciente);


  }


  public v_Filtrar(event : any){

    this.lstFilter.splice(0, this.lstFilter.length);
    let value : string = event.target.value.toLowerCase();
 
 
    this.lstPaciente.filter(f => (f.Filtro).toLowerCase().includes(value)).forEach(f =>{
      this.lstFilter.push(f);
    });

  }



  public v_Cancelar() :void{
    this.dialogRef.close();
  }
  

  ngOnInit(): void {

    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "CerrarDialog" && s[1] == "frmPaciente") {
          this.v_Cancelar();
        }


      }
    });


    this._ExpdienteService.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "Llenar_paciente") {
          this.LlenarPaciente(s[1]);
        }

        

      }
    });


  }

}
