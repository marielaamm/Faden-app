import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iEstiloVida } from 'src/app/main/inicio/interface/i-estilo-vida';
import { iEstiloVidaAlimentacion } from 'src/app/main/inicio/interface/i-estilo-vida-alimentacion';
import { iEstiloVidaDatos } from 'src/app/main/inicio/interface/i-estilo-vida-datos';
import { iEstiloVidaEjercicio } from 'src/app/main/inicio/interface/i-estilo-vida-ejercicio';
import { ExpdienteService } from 'src/app/main/inicio/service/expediente.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-estilo-vida',
  templateUrl: './estilo-vida.component.html',
  styleUrls: ['./estilo-vida.component.scss']
})
export class EstiloVidaComponent implements OnInit {

  public val: Validacion = new Validacion ();
  public IdPaciente : Number = 0;
 

  public rdSenderismo : String = "";
  public rdAlcoholismo : String = "";
  public rdTabaquismo : String = "";
  public rdCafe : String = "";
  public rdRuido : String = "";
  public rdDespertar : String = "";

  private lstTablaEjercicio : iEstiloVidaEjercicio[];
  private lstTablaAlimentacion : iEstiloVidaAlimentacion[]

  private Guardando : Boolean = false;



  
  constructor(private ServerScv : ServerService, private _Dialog: MatDialog, private _ExpdienteService: ExpdienteService) {

    

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

    this.val.add("chkCuido_Jardin", "1", "LEN>=", "0");
    this.val.add("txtCuido_Jardin", "1", "LEN>=", "0");

    this.val.add("chkBailar", "1", "LEN>=", "0");
    this.val.add("txtBailar", "1", "LEN>=", "0");

    this.val.add("chkTrabaja_dentro_o_fuera_de_casa", "1", "LEN>=", "0");
    this.val.add("txtTrabaja_dentro_o_fuera_de_casa", "1", "LEN>=", "0");


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

    this.Guardando = false;
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


   public v_Guardar(){

 
    this.Guardando = true;

    let Datos : iEstiloVidaDatos  = {} as iEstiloVidaDatos;
    let EstiloVida : iEstiloVida = {} as iEstiloVida;


    EstiloVida.Senderismo = this.rdSenderismo;
    EstiloVida.Alcoholismo = this.rdAlcoholismo;
    EstiloVida.Tabaquismo = this.rdTabaquismo;
    EstiloVida.Cafe = this.rdCafe;
    EstiloVida.Ruido = this.rdRuido;
    EstiloVida.Despertar = this.rdDespertar;
    EstiloVida.IdPaciente = this.IdPaciente;



    this.lstTablaEjercicio?.forEach(f =>{
     f.IdPaciente = this.IdPaciente;
     f.Activo = this.val.ValForm.get("chk" + f.IdElemento.toString())?.value;
     f.Frecuencia = this.val.ValForm.get("txt" + f.IdElemento.toString())?.value;
    });

    this.lstTablaAlimentacion?.forEach(f =>{
      f.IdPaciente = this.IdPaciente;
      f.Porcion = this.val.ValForm.get("txtP" + f.IdElemento.toString())?.value;
      f.Frecuencia = this.val.ValForm.get("txtF" + f.IdElemento.toString())?.value;
     });

     Datos.EstiloVida = EstiloVida;
     Datos.Ejercicios = this.lstTablaEjercicio;
     Datos.Alimentacion = this.lstTablaAlimentacion;

     this._ExpdienteService.GuardarEstiloVida(Datos);

  }


  private Llenar(datos : any)
   {
    let _json = JSON.parse(datos);

    if(_json["d"].length == 0) return;

    let EstiloVida : iEstiloVida = JSON.parse(_json["d"].EstiloVida)[0];
    this.lstTablaEjercicio = JSON.parse(_json["d"].EstiloVidaEjercicio);
    this.lstTablaAlimentacion =  JSON.parse(_json["d"].EstiloVidaAlimentacion);

    if(this.lstTablaEjercicio.length == 0)
    {

      this.lstTablaEjercicio  = [
      {IdEjercicio : 0, IdElemento : "Caminar",  Frecuencia : "",  Activo : false, IdPaciente : 0 },
      {IdEjercicio : 0, IdElemento : "Trotar",  Frecuencia : "",  Activo : false, IdPaciente : 0 },
      {IdEjercicio : 0, IdElemento : "Correr",  Frecuencia : "",  Activo : false, IdPaciente : 0 },
      {IdEjercicio : 0, IdElemento : "Nadar",  Frecuencia : "",  Activo : false, IdPaciente : 0 },
      {IdEjercicio : 0, IdElemento : "Ciclismo",  Frecuencia : "",  Activo : false, IdPaciente : 0 },
      {IdEjercicio : 0, IdElemento : "Cuido_Jardin",  Frecuencia : "",  Activo : false, IdPaciente : 0 },
      {IdEjercicio : 0, IdElemento : "Bailar",  Frecuencia : "",  Activo : false, IdPaciente : 0 },
      {IdEjercicio : 0, IdElemento : "Trabaja_dentro_o_fuera_de_casa",  Frecuencia : "",  Activo : false, IdPaciente : 0 }
    ];
    }


    if(this.lstTablaAlimentacion.length == 0)
    {
      this.lstTablaAlimentacion = [
        {IdAlimentacion : 0, IdElemento : "Fruta",  Porcion : "",  Frecuencia : "", IdPaciente : 0 },
        {IdAlimentacion : 0, IdElemento : "Vegetales",  Porcion : "",  Frecuencia : "", IdPaciente : 0 },
        {IdAlimentacion : 0, IdElemento : "Ensalada",  Porcion : "",  Frecuencia : "", IdPaciente : 0 },
        {IdAlimentacion : 0, IdElemento : "Carne",  Porcion : "",  Frecuencia : "", IdPaciente : 0 }
      ];
    }



 

    this.rdSenderismo = EstiloVida?.Senderismo;
    this.rdAlcoholismo = EstiloVida?.Alcoholismo
    this.rdTabaquismo = EstiloVida?.Tabaquismo
    this.rdCafe =  EstiloVida?.Cafe
    this.rdRuido =  EstiloVida?.Ruido
    this.rdDespertar =  EstiloVida?.Despertar


    this.val.ValForm.get("rdSenderismo")?.setValue(this.rdSenderismo );
    this.val.ValForm.get("rdAlcoholismo")?.setValue(this.rdAlcoholismo);
    this.val.ValForm.get("rdTabaquismo")?.setValue(this.rdTabaquismo);
    this.val.ValForm.get("rdCafe")?.setValue(this.rdCafe);
    this.val.ValForm.get("rdRuido")?.setValue(this.rdRuido);
    this.val.ValForm.get("rdDespertar")?.setValue(this.rdDespertar);


    this.lstTablaEjercicio.forEach(f =>{
      this.val.ValForm.get("chk" + f.IdElemento.toString())?.setValue(f.Activo);
      this.val.ValForm.get("txt" + f.IdElemento.toString())?.setValue(f.Frecuencia);
      this.fn_Enable("chk" + f.IdElemento.toString(), "txt" + f.IdElemento.toString(), Boolean(f.Activo));
    });

    this.lstTablaAlimentacion.forEach(f =>{
      this.val.ValForm.get("txtP" + f.IdElemento.toString())?.setValue(f.Porcion);
      this.val.ValForm.get("txtF" + f.IdElemento.toString())?.setValue(f.Frecuencia);
    });
   
   }



  ngOnInit(): void {

    
    this.ServerScv.change.subscribe(s => {
    
      if (s instanceof Array) {


        if(s[0] == "Menu Expediente"){
          this.IdPaciente =  s[1];
          this._ExpdienteService.BuscarExamenFisicoSistema(this.IdPaciente);
        }
        if(s[0] == "Cerrar Expediente") 
        {
          this.IdPaciente = 0
          this.Limpiar();
        }

       
        
      }
    });

    this._ExpdienteService.change.subscribe(s => {

      if(s[0] == "Llenar_Estilo_Vida") this.Llenar(s[1] );
      if(s[0] == "Llenar_Datos_Paciente") this.Llenar(s[1] );



      if (s[0] == "dato_Estilo_Vida_Guardar") {

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

