import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iDepartamento } from '../../interface/i-departamento';
import { CatalogoService } from '../../service/catalogo.service';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss']
})
export class MunicipioComponent implements OnInit {

  public lstDepartamento: iDepartamento [] = [];
  private _CatalogoService : CatalogoService;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {
    this._CatalogoService = new CatalogoService(this._Dialog)
    this._CatalogoService.BuscarDpto("");
   }


  private LlenarDpto(datos:string):void{

    let _json = JSON.parse(datos);

    _json["d"].forEach(
      (b:any)=>{
        this.lstDepartamento.push({IdDepartamento : b.IdDpto, Codigo : b.Codigo, Departamento : b.Nombre});
      }
    );
    
  }


  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

  Cerrar() : void {

    this.ServerScv.CerrarFormulario();

  }

  ngOnInit(): void {


    this._CatalogoService.change.subscribe(s =>{

      if(s[0] == "Llenar_departamento"){
        this.LlenarDpto(s[1]);
      }
    });
 
  }


  


}
