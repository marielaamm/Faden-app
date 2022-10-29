import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iMunicipio } from '../../../interface/i-municipio';
import { CatalogoService } from '../../../service/catalogo.service';


let ELEMENT_DATA: iMunicipio[] =[];

@Component({
  selector: 'app-municipio-registro',
  templateUrl: './municipio-registro.component.html',
  styleUrls: ['./municipio-registro.component.scss']
})
export class MunicipioRegistroComponent implements OnInit {

  displayedColumns: string[] = ['IdMunicipio','Municipio','CoDepto','Departamento', 'Accion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iMunicipio>();
  private _liveAnnouncer:any;
  private _CatalogoService: CatalogoService;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {

    this._CatalogoService = new CatalogoService(this._Dialog);
    this._CatalogoService.BuscarMunicipio(""); 
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

  
  private LlenarMunicipio(datos: string): void {

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

    
    this._CatalogoService.change.subscribe(s => {
    
      if (s instanceof Array) {

        if (s[0] == "Llenar_municipio") {
          this.LlenarMunicipio(s[1]);
        }

        //if (s[0] == "dato_Departamento_Eliminar") {
          //this._CatalogoService.GuardarDepartamento(Departamento);
        //}

      }
    });
  }

}
