import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { ExpdienteService } from '../../service/expediente.service';

@Component({
  selector: 'app-soap',
  templateUrl: './soap.component.html',
  styleUrls: ['./soap.component.scss']
})
export class SoapComponent implements OnInit {

  public isLinear = false;
  public lstPaciente:{}[]=[];
  public val: Validacion = new Validacion ();
  
  private _CatalogoService: CatalogoService;
  private _ExpdienteService: ExpdienteService;

  public rdTipoAcompañante : Number = 1;
  public rdPropositoVisita : Number = 1;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {
   // [ REGLAS ] 

   this.val.add("txtFecha", "1", "LEN>","0");
   this.val.add("txtHora", "1", "LEN>", "0");   
   this.val.add("txtPaciente","1","LEN>","0");
   this.val.add("txtNoExpediente", "1", "LEN>","0");
   this.val.add("rdTipoAcompañante", "1","LEN>", "0");
   //revisar el html sobre radio button tipo acomp
   this.val.add("txtNombrecuidador", "1", "LEN>", "0");
   this.val.add("txtDireccion", "1", "LEN>","0");
   this.val.add("txtTelefono", "1", "LEN>","0");
   this.val.add("rdPropositoVisita","1","LEN>","0");
   

   

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
