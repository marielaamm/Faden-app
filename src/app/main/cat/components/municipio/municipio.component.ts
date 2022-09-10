import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iDepartamento } from '../../interface/i-departamento';
import { CatalogoService } from '../../service/catalogo.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss']
})
export class MunicipioComponent implements OnInit {
  public val : Validacion = new Validacion();

  public lstDepartamento: iDepartamento [] = [];
  private _CatalogoService : CatalogoService;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {
    this.val.add("txtMunicipio","1","LEN>", "0");
    this.val.add("txtMunicipio", "2","LEN<=", "50");
    this.val.add("txtDepartamento", "1", "LEN>", "0");

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



public v_Guardar():void{
  let esError :string="";
  let mensaje :string="<ol>";

  if(this.val.ValForm.get("txtMunicipio")?.invalid){
    mensaje += "<li>Ingrese el nombre del Municipio o revise la cantidada de caracteres</li>";
    esError +="1";
  }

  if(this.val.ValForm.get("txtDepartamento")?.invalid){
    mensaje += "<li>Seleccione un departamento</li>"
    esError +="1";
  }
  mensaje +="</ol>";

  if(esError.includes("1")){
    let s : string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\""+ 1 + "\",\"Mensaje\":\""+ mensaje + "\"}"+ ", \"count\":"+ 0 + ", \"esError\":"+ 1 + "}";

    let _json= JSON.parse(s);
    this._Dialog.open(DialogoComponent,{
      data: _json["msj"]
    });
    return;


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
