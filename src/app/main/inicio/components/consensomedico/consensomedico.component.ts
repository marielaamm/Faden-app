import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { ExpdienteService } from '../../service/expediente.service';

@Component({
  selector: 'app-consensomedico',
  templateUrl: './consensomedico.component.html',
  styleUrls: ['./consensomedico.component.scss']
})
export class ConsensomedicoComponent implements OnInit {

  public isLinear = false;
  public val: Validacion = new Validacion();
  private _CatalogoService: CatalogoService;
  private _ExpdienteService: ExpdienteService;

  
  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) { 

    this.val.add("rdNormal","1", "LEN>", "0");
    this.val.add("txtDetNormal","1", "LEN>", "0");
    this.val.add("rdLeve","1", "LEN>", "0");
    this.val.add("txtDetLeve","1", "LEN>", "0");
    this.val.add("rdMayor","1", "LEN>", "0");
    this.val.add("txtDetMayor","1", "LEN>", "0");    

    this.val.add("chkDepre","1", "LEN>", "0");
    this.val.add("txtDepresion","1", "LEN>", "0");
    this.val.add("chkBipolar","1", "LEN>", "0");
    this.val.add("txtBipolar","1", "LEN>", "0");
    this.val.add("chkEsquizo","1", "LEN>", "0");
    this.val.add("txtEsquizo","1", "LEN>", "0");
    this.val.add("chkOtro","1", "LEN>", "0");
    this.val.add("txtOtro","1", "LEN>", "0");

    this.val.add("rdProbable","1", "LEN>", "0");
    this.val.add("txtDiagProbable","1", "LEN>", "0");
    this.val.add("rdConfir","1", "LEN>", "0");
    this.val.add("txtDiagConfir","1", "LEN>", "0");


    this.limpiar();

    this._ExpdienteService = new ExpdienteService(this._Dialog);

  }

  public limpiar(){
    this.val.ValForm.get("rdNormal")?.setValue("");
    this.val.ValForm.get("txtDetNormal")?.setValue("");
    this.val.ValForm.get("rdLeve")?.setValue("");
    this.val.ValForm.get("txtDetLeve")?.setValue("");
    this.val.ValForm.get("rdMayor")?.setValue("");
    this.val.ValForm.get("txtDetMayor")?.setValue("");
    this.val.ValForm.get("chkDepre")?.setValue("");

    
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
