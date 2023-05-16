import { Component, OnInit } from '@angular/core';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ExpdienteService } from '../../../../service/expediente.service';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iExamenFisicoSistema } from '../../../../interface/i-examen-fisico-sistema';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { iDatosExpediente } from 'src/app/main/inicio/interface/i-datos-expediente';


@Component({
  selector: 'app-examen-fisico',
  templateUrl: './examen-fisico.component.html',
  styleUrls: ['./examen-fisico.component.scss']
})
export class ExamenFisicoComponent implements OnInit {

  public val: Validacion = new Validacion ();
  public IdPaciente : Number = 0;
  public Guardando : boolean = false;

  private lstTabla: iExamenFisicoSistema[];


 

  
  constructor(private ServerScv : ServerService, private _Dialog: MatDialog,  private _ExpdienteService: ExpdienteService) {

    
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


    this.Guardando = false;
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

    this.lstTabla = [
      {IdExFisicoSistema : 0, IdElemento : "CardioVascular",  Observaciones : "",  Activo : false, IdPaciente : 0 },
      {IdExFisicoSistema : 0, IdElemento : "Endocrinologico",  Observaciones : "",  Activo : false, IdPaciente : 0 },
      {IdExFisicoSistema : 0, IdElemento : "Faneras",  Observaciones : "",  Activo : false, IdPaciente : 0 },
      {IdExFisicoSistema : 0, IdElemento : "Gastroinstestinal",  Observaciones : "",  Activo : false, IdPaciente : 0 },
      {IdExFisicoSistema : 0, IdElemento : "Genitourinario",  Observaciones : "",  Activo : false, IdPaciente : 0 },
      {IdExFisicoSistema : 0, IdElemento : "General",  Observaciones : "",  Activo : false, IdPaciente : 0 },
      {IdExFisicoSistema : 0, IdElemento : "Linfatico",  Observaciones : "",  Activo : false, IdPaciente : 0 },
      {IdExFisicoSistema : 0, IdElemento : "Mucosas",  Observaciones : "",  Activo : false, IdPaciente : 0 },
      {IdExFisicoSistema : 0, IdElemento : "Neurologico",  Observaciones : "",  Activo : false, IdPaciente : 0 },
      {IdExFisicoSistema : 0, IdElemento : "Osteomuscular",  Observaciones : "",  Activo : false, IdPaciente : 0 },
      {IdExFisicoSistema : 0, IdElemento : "Muscular",  Observaciones : "",  Activo : false, IdPaciente : 0 },
    ];

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


   public v_Guardar(){

 
    this.Guardando = true;

    this.lstTabla.forEach(f =>{
     f.IdPaciente = this.IdPaciente;
     f.Activo = this.val.ValForm.get("chk" + f.IdElemento.toString())?.value;
     f.Observaciones = this.val.ValForm.get("txt" + f.IdElemento.toString())?.value;
    });

  
    this._ExpdienteService.GuardarExamenFisicoSistema(this.lstTabla);

  }

   private Llenar(datos : any)
   {

    let _json = JSON.parse(datos);

    if(_json["d"].length == 0) return;

    let d : iDatosExpediente =  _json["d"];
    this.lstTabla = JSON.parse(d.ExamenFisicoSistema);

   

    this.lstTabla.forEach(f =>{
      this.val.ValForm.get("chk" + f.IdElemento.toString())?.setValue(f.Activo);
      this.val.ValForm.get("txt" + f.IdElemento.toString())?.setValue(f.Observaciones);
      this.fn_Enable("chk" + f.IdElemento.toString(), "txt" + f.IdElemento.toString(), Boolean(f.Activo));
    });
   
   }



  ngOnInit(): void {



    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {


        if(s[0] == "Menu Expediente"){
          this.IdPaciente =  s[1];
        }
        if(s[0] == "Cerrar Expediente") 
        {
          this.IdPaciente = 0
          this.Limpiar();
        }

       
        
      }
    });

    this._ExpdienteService.change.subscribe(s => {

      if(s[0] == "Llenar_Datos_Paciente") this.Llenar(s[1] );



      if (s[0] == "dato_Examen_Fisico_Sistema_Guardar") {

        this.Guardando = false; 

        if (s[1] == undefined) {


          let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + "error al guardar" + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
          let _json = JSON.parse(s);
          this._Dialog.open(DialogoComponent, {
            data: _json["msj"]
          });
          return;
        }


        this._Dialog.open(DialogoComponent, {
          data: s[1]["msj"]
        });

        
      }


    });


  }

}
