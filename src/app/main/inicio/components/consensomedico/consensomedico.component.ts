import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-consensomedico',
  templateUrl: './consensomedico.component.html',
  styleUrls: ['./consensomedico.component.scss']
})
export class ConsensomedicoComponent implements OnInit {

  public isLinear = false;
  public val: Validacion = new Validacion();
  private _CatalogoService: CatalogoService;
  
  constructor(private ServerScv : ServerService) { 

    this.val.add("rdNormal","1", "LEN>=", "0");
    this.val.add("rdLeve","1", "LEN>=", "0");
    this.val.add("rdMayor","1", "LEN>=", "0");
    this.val.add("chkDepre","1", "LEN>=", "0");
    this.val.add("chkBipolar","1", "LEN>=", "0");
    this.val.add("chkEsquizo","1", "LEN>=", "0");
    this.val.add("chkOtro","1", "LEN>=", "0");
    this.val.add("rdProbable","1", "LEN>=", "0");
    this.val.add("rdConfir","1", "LEN>=", "0");

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
