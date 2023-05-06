import { Component, OnInit } from '@angular/core';
import { Validacion } from 'src/app/main/shared/class/validacion';

@Component({
  selector: 'app-examen-fisico',
  templateUrl: './examen-fisico.component.html',
  styleUrls: ['./examen-fisico.component.scss']
})
export class ExamenFisicoComponent implements OnInit {

  public val: Validacion = new Validacion ();
  public IdPaciente : Number = 0;
  public ID : Number = 0;


  
  constructor() {

    
    this.val.add("chkCardioVascular", "1", "LEN>=", "0");
    this.val.add("txtCardioVascular", "1", "LEN>=", "0");

    this.val.add("chkEndocrinologico", "1", "LEN>=", "0");
    this.val.add("txtEndocrinologico", "1", "LEN>=", "0");

    this.val.add("chkFaneras", "1", "LEN>=", "0");
    this.val.add("txtFaneras", "1", "LEN>=", "0");

    this.val.add("chkGastroinstestinal", "1", "LEN>=", "0");
    this.val.add("txtGastroinstestinal", "1", "LEN>=", "0");

    this.val.add("chkGenitourinario", "1", "LEN>=", "0");
    this.val.add("txtGenitourinario", "1", "LEN>=", "0");

    this.val.add("chkGeneral", "1", "LEN>=", "0");
    this.val.add("txtGeneral", "1", "LEN>=", "0");

    this.val.add("chkLinfatico", "1", "LEN>=", "0");
    this.val.add("txtLinfatico", "1", "LEN>=", "0");

    this.val.add("chkMucosas", "1", "LEN>=", "0");
    this.val.add("txtMucosas", "1", "LEN>=", "0");


    this.val.add("chkNeurologico", "1", "LEN>=", "0");
    this.val.add("txtNeurologico", "1", "LEN>=", "0");

    this.val.add("chkOsteomuscular", "1", "LEN>=", "0");
    this.val.add("txtOsteomuscular", "1", "LEN>=", "0");


    this.val.add("chkMuscular", "1", "LEN>=", "0");
    this.val.add("txtMuscular", "1", "LEN>=", "0");

    


    this.Limpiar();
   }


   Limpiar()
   {


    this.val.ValForm.get("chkCardioVascular")?.setValue(false);
    this.val.ValForm.get("txtCardioVascular")?.setValue("");
    this.val.ValForm.get("txtCardioVascular")?.disable();

    this.val.ValForm.get("chkEndocrinologico")?.setValue(false);
    this.val.ValForm.get("txtEndocrinologico")?.setValue("");
    this.val.ValForm.get("txtEndocrinologico")?.disable();
    
    this.val.ValForm.get("chkFaneras")?.setValue(false);
    this.val.ValForm.get("txtFaneras")?.setValue("");
    this.val.ValForm.get("txtFaneras")?.disable();

    this.val.ValForm.get("chkGastroinstestinal")?.setValue(false);
    this.val.ValForm.get("txtGastroinstestinal")?.setValue("");
    this.val.ValForm.get("txtGastroinstestinal")?.disable();


    this.val.ValForm.get("chkGenitourinario")?.setValue(false);
    this.val.ValForm.get("txtGenitourinario")?.setValue("");
    this.val.ValForm.get("txtGenitourinario")?.disable();

    this.val.ValForm.get("chkGeneral")?.setValue(false);
    this.val.ValForm.get("txtGeneral")?.setValue("");
    this.val.ValForm.get("txtGeneral")?.disable();

    this.val.ValForm.get("chkLinfatico")?.setValue(false);
    this.val.ValForm.get("txtLinfatico")?.setValue("");
    this.val.ValForm.get("txtLinfatico")?.disable();

    this.val.ValForm.get("chkMucosas")?.setValue(false);
    this.val.ValForm.get("txtMucosas")?.setValue("");
    this.val.ValForm.get("txtMucosas")?.disable();

    this.val.ValForm.get("chkNeurologico")?.setValue(false);
    this.val.ValForm.get("txtNeurologico")?.setValue("");
    this.val.ValForm.get("txtNeurologico")?.disable();


    this.val.ValForm.get("chkOsteomuscular")?.setValue(false);
    this.val.ValForm.get("txtOsteomuscular")?.setValue("");
    this.val.ValForm.get("txtOsteomuscular")?.disable();

    this.val.ValForm.get("chkMuscular")?.setValue(false);
    this.val.ValForm.get("txtMuscular")?.setValue("");
    this.val.ValForm.get("txtMuscular")?.disable();

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
