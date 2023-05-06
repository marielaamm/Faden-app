import { Component, OnInit } from '@angular/core';
import { Validacion } from 'src/app/main/shared/class/validacion';

@Component({
  selector: 'app-estilo-vida',
  templateUrl: './estilo-vida.component.html',
  styleUrls: ['./estilo-vida.component.scss']
})
export class EstiloVidaComponent implements OnInit {

  public val: Validacion = new Validacion ();
  public IdPaciente : Number = 0;
  public ID : Number = 0;

  public rdSenderismo : string = "";
  public rdAlcoholismo : string = "";
  public rdTabaquismo : string = "";
  public rdCafe : string = "";
  public rdRuido : string = "";
  public rdDespertar : string = "";
  
  constructor() {

    

    this.val.add("rdSenderismo", "1", "LEN>=", "0");
    this.val.add("rdAlcoholismo", "1", "LEN>=", "0");
    this.val.add("rdTabaquismo", "1", "LEN>=", "0");
    this.val.add("rdCafe", "1", "LEN>=", "0");
    this.val.add("rdRuido", "1", "LEN>=", "0");
    this.val.add("rdDespertar", "1", "LEN>=", "0");


    this.val.add("chkCaminar", "1", "LEN>=", "0");
    this.val.add("txtCaminar", "1", "LEN>=", "0");

    this.val.add("chkTrotar", "1", "LEN>=", "0");
    this.val.add("txtTrotar", "1", "LEN>=", "0");

    this.val.add("chkCorrer", "1", "LEN>=", "0");
    this.val.add("txtCorrer", "1", "LEN>=", "0");

    this.val.add("chkNadar", "1", "LEN>=", "0");
    this.val.add("txtNadar", "1", "LEN>=", "0");

    this.val.add("chkCiclismo", "1", "LEN>=", "0");
    this.val.add("txtCiclismo", "1", "LEN>=", "0");

    this.val.add("chkJardin", "1", "LEN>=", "0");
    this.val.add("txtJardin", "1", "LEN>=", "0");

    this.val.add("chkBailar", "1", "LEN>=", "0");
    this.val.add("txtBailar", "1", "LEN>=", "0");

    this.val.add("chkTrabaja", "1", "LEN>=", "0");
    this.val.add("txtTrabaja", "1", "LEN>=", "0");


    this.val.add("txtPFruta", "1", "LEN>=", "0");
    this.val.add("txtFFruta", "1", "LEN>=", "0");

    this.val.add("txtPVegetales", "1", "LEN>=", "0");
    this.val.add("txtFVegetales", "1", "LEN>=", "0");


    this.val.add("txtPEnsalada", "1", "LEN>=", "0");
    this.val.add("txtFEnsalada", "1", "LEN>=", "0");

    this.val.add("txtPCarne", "1", "LEN>=", "0");
    this.val.add("txtFCarne", "1", "LEN>=", "0");

    this.val.add("txtHoras", "1", "LEN>=", "0");


    this.Limpiar();
   }


   Limpiar()
   {

    this.rdSenderismo = "No";
    this.rdAlcoholismo = "No Toma";
    this.rdTabaquismo = "No Fuma";
    this.rdCafe =  "No";
    this.rdRuido =  "No";
    this.rdDespertar =  "No";


    this.val.ValForm.get("rdSenderismo")?.setValue(this.rdSenderismo );
    this.val.ValForm.get("rdAlcoholismo")?.setValue(this.rdAlcoholismo);
    this.val.ValForm.get("rdTabaquismo")?.setValue(this.rdTabaquismo);
    this.val.ValForm.get("rdCafe")?.setValue(this.rdCafe);
    this.val.ValForm.get("rdRuido")?.setValue(this.rdRuido);
    this.val.ValForm.get("rdDespertar")?.setValue(this.rdDespertar);

    this.val.ValForm.get("chkCaminar")?.setValue(false);
    this.val.ValForm.get("txtCaminar")?.setValue("");
    this.val.ValForm.get("txtCaminar")?.disable();

    this.val.ValForm.get("chkTrotar")?.setValue(false);
    this.val.ValForm.get("txtTrotar")?.setValue("");
    this.val.ValForm.get("txtTrotar")?.disable();
    
    this.val.ValForm.get("chkCorrer")?.setValue(false);
    this.val.ValForm.get("txtCorrer")?.setValue("");
    this.val.ValForm.get("txtCorrer")?.disable();

    this.val.ValForm.get("chkNadar")?.setValue(false);
    this.val.ValForm.get("txtNadar")?.setValue("");
    this.val.ValForm.get("txtNadar")?.disable();


    this.val.ValForm.get("chkCiclismo")?.setValue(false);
    this.val.ValForm.get("txtCiclismo")?.setValue("");
    this.val.ValForm.get("txtCiclismo")?.disable();

    this.val.ValForm.get("chkJardin")?.setValue(false);
    this.val.ValForm.get("txtJardin")?.setValue("");
    this.val.ValForm.get("txtJardin")?.disable();

    this.val.ValForm.get("chkBailar")?.setValue(false);
    this.val.ValForm.get("txtBailar")?.setValue("");
    this.val.ValForm.get("txtBailar")?.disable();

    this.val.ValForm.get("chkTrabaja")?.setValue(false);
    this.val.ValForm.get("txtTrabaja")?.setValue("");
    this.val.ValForm.get("txtTrabaja")?.disable();

    this.val.ValForm.get("txtPFruta")?.setValue("");
    this.val.ValForm.get("txtFFruta")?.setValue("");


    this.val.ValForm.get("txtPVegetales")?.setValue("");
    this.val.ValForm.get("txtFVegetales")?.setValue("");



    this.val.ValForm.get("txtPEnsalada")?.setValue("");
    this.val.ValForm.get("txtFEnsalada")?.setValue("");

    

    this.val.ValForm.get("txtPCarne")?.setValue("");
    this.val.ValForm.get("txtFCarne")?.setValue("");


    this.val.ValForm.get("txtHoras")?.setValue("");
   }


   public fn_Enable(id_chk: string, id_txt : string, estado : boolean){

    this.val.ValForm.get(id_chk)?.setValue(estado);

    
    if(estado)
    {
      this.val.ValForm.get(id_txt)?.enable();
    }
    else
    {
      this.val.ValForm.get(id_txt)?.setValue("");
      this.val.ValForm.get(id_txt)?.disable();
    }

   }




  ngOnInit(): void {
  }

}
