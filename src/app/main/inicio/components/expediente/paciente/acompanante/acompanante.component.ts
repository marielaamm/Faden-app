import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { iAcompanante } from "src/app/main/inicio/interface/i-acompanante";

@Component({
  selector: 'app-acompanante',
  templateUrl: './acompanante.component.html',
  styleUrls: ['./acompanante.component.scss']
})
export class AcompananteComponent implements OnInit {

  myCheckbox: FormControl = new FormControl();
  dataSource: iAcompanante[] = [];

  constructor() { }



  f_Agregar_Fila(): void {
    let _Fila: iAcompanante = {} as iAcompanante;

    _Fila.IdAcpte = -1;
    _Fila.NombreCompleto = "";
    _Fila.Telefono = "";
    _Fila.Direccion = "";
    _Fila.Correo = "";
    _Fila.EsAcpte = true;
    _Fila.EsCuidador = false;
    _Fila.EsPrimario = false;
    _Fila.EsSecundario = false;
    _Fila.IdPaciente = 0;

    this.dataSource.unshift(_Fila);

  }



  public v_Seleccionar(event : any, iAcompanante: Number, columna: string): void {


    let Fila = this.dataSource.find(f => f.IdAcpte == iAcompanante);

    switch (columna) {
      case "A":
        Fila!.EsAcpte = !Fila!.EsAcpte;
        break;
      case "C":
        Fila!.EsCuidador = !Fila!.EsCuidador;
        break;

      case "P":
        Fila!.EsPrimario = !Fila!.EsPrimario;
        break;

      case "S":
        Fila!.EsSecundario = !Fila!.EsSecundario;
        break;
    }


  }


  ngOnInit(): void {
  }

}
