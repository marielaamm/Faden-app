import { Component, OnInit } from '@angular/core';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {
  public lstMunicipio: {}[] = [];

  public val : Validacion = new Validacion();


  constructor(private ServerScv : ServerService) { 

    this.val.add("txtNoExpediente", "1","LEN>=", "0");
    this.val.add("txtFecha", "1", "LEN>", "0");
    this.val.add("txtPrimerNombre", "1","LEN>","0");
    this.val.add("txtSegundoNombre","1", "LEN>", "0");
    this.val.add("txtPrimerApellido","1", "LEN>","0");
    this.val.add("txtSegundoApellido","1", "LEN>","0");
    this.val.add("txtMunicipio", "1", "LEN>", "0");
    this.val.add("txtFechaNacimiento", "1","LEN>","0");
    this.val.add("txtEdad","1", "LEN>","0");
    this.val.add("txtCedula", "1", "LEN>","0");
    this.val.add("txtEspecialidad", "1", "LEN>", "0");
    this.val.add("txtDireccion", "1", "LEN>", "0");
    this.val.add("txtCorreo", "1", "LEN>", "0");
    this.val.add("txtTelefono","1", "LEN>", "0");
    this.val.add("txtCelular","1", "LEN>", "0");
 
  }

  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}







  Cerrar() : void{
    
    this.ServerScv.CerrarFormulario();
  }

  ngOnInit(): void {
  }

}
