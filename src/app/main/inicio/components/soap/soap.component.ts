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

  public rdTipoAcompanante : Number = 1;
  public rdPropositoVisita : Number = 1;

  constructor(private ServerScv : ServerService, private _Dialog: MatDialog) {
   // [ REGLAS ] 

   this.val.add("txtFecha", "1", "LEN>","0");
   this.val.add("txtHora", "1", "LEN>", "0");   
   this.val.add("txtPaciente","1","LEN>","0");
   this.val.add("txtNoExpediente", "1", "LEN>","0");
   this.val.add("rdTipoAcompanante", "1","LEN>", "0");
   //revisar el html sobre radio button tipo acomp
   this.val.add("txtNombrecuidador", "1", "LEN>", "0");
   this.val.add("txtDireccion", "1", "LEN>","0");
   this.val.add("txtTelefono", "1", "LEN>","0");
   this.val.add("rdPropositoVisita","1","LEN>","0");
   this.val.add("txtSubjetivo","1","LEN>","0");
   this.val.add("txtObjetivo","1","LEN>","0");
   this.val.add("txtAvaluo","1","LEN>","0");
   this.val.add("txtPlanes","1","LEN>","0");
   
   this._ExpdienteService = new ExpdienteService(this._Dialog);
    this._CatalogoService = new CatalogoService(this._Dialog);

    this.limpiar();

   }

   public limpiar(){
    this.rdTipoAcompanante = 1;
    this.rdPropositoVisita = 1;
    
    this.val.ValForm.get("txtFecha")?.setValue("");
    this.val.ValForm.get("txtHora")?.setValue("");
    this.val.ValForm.get("txtPaciente")?.setValue("");
    this.val.ValForm.get("txtNoExpediente")?.setValue("");
    this.val.ValForm.get("rdTipoAcompanante")?.setValue("");
    this.val.ValForm.get("txtNombrecuidador")?.setValue("");
    this.val.ValForm.get("txtDireccion")?.setValue("");
    this.val.ValForm.get("txtTelefono")?.setValue("");
    this.val.ValForm.get("rdPropositoVisita")?.setValue("");
    this.val.ValForm.get("txtSubjetivo")?.setValue("");
    this.val.ValForm.get("txtObjetivo")?.setValue("");
    this.val.ValForm.get("txtAvaluo")?.setValue("");
    this.val.ValForm.get("txtPlanes")?.setValue("");

    this._ExpdienteService = new ExpdienteService(this._Dialog);
    this._CatalogoService = new CatalogoService(this._Dialog);
    
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
