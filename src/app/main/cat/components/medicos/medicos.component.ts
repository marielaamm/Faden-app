import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { CatalogoService } from '../../service/catalogo.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {
  public lstMunicipio: {}[] = [];
  public val : Validacion = new Validacion();
  private _CatalogoService:CatalogoService;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) { 

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
    this.limpiar();

    this._CatalogoService = new CatalogoService(this._Dialog);
 
  }

  private limpiar(){
    this.val.ValForm.get("txtNoExpediente")?.setValue("");
    this.val.ValForm.get("txtFecha")?.setValue("");
    this.val.ValForm.get("txtPrimerNombre")?.setValue("");
    this.val.ValForm.get("txtSegundoNombre")?.setValue("");
    this.val.ValForm.get("txtPrimerApellido")?.setValue("");
    this.val.ValForm.get("txtSegundoApellido")?.setValue("");
    this.val.ValForm.get("txtMunicipio")?.setValue("");
    this.val.ValForm.get("txtFechaNacimiento")?.setValue("");
    this.val.ValForm.get("txtEdad")?.setValue("");
    this.val.ValForm.get("txtCedula")?.setValue("");
    this.val.ValForm.get("txtEspecialidad")?.setValue("");
    this.val.ValForm.get("txtDireccion")?.setValue("");
    this.val.ValForm.get("txtCorreo")?.setValue("");
    this.val.ValForm.get("txtTelefono")?.setValue("");
    this.val.ValForm.get("txtCelular")?.setValue("");

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
