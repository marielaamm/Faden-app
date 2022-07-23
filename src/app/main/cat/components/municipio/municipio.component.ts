import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss']
})
export class MunicipioComponent implements OnInit {

  public lstDepartamento: {IdDepartamento: Number, Departamento: String}[] = [];

  constructor(private ServerScv : ServerService) {
    ServerScv._DptoService.BuscarDpto();
   }


  private LlenarDpto(datos:string):void{
    let _json = JSON.parse(datos);

    _json["d"].forEach(
      (b:any)=>{
        this.lstDepartamento.push({IdDepartamento : b.IdDepartamento, Departamento: b.Departamento});
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
 
  }


  
  ngAfterViewInit(): void {

    this.ServerScv._DptoService.change.subscribe(

      s =>{
        this.LlenarDpto(s[1]);
      }
    );
  
  }

}
