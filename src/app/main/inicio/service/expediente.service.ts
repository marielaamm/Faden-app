import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Conexion } from '../../shared/class/conexion';
import { DialogoComponent } from '../../shared/components/dialogo/dialogo.component';
import { iAntecedentePatologico } from '../interface/i-antecedente-patologico';
import { iAntecedenteQuirurgico } from '../interface/i-antecedente-quirurgico';
import { iConsenso } from '../interface/i-consenso';
import { iPaciente } from '../interface/i-paciente';
import { iSistemaSoap } from '../interface/i-sistema-soap';
import { iTratamientoActual } from '../interface/i-tratamiento-actual';
import { iExamenClinico } from '../interface/i-examen-clinico';
import { iAntecedentesFamiliares } from '../interface/i-antecedentes-familiares';
import { iValoracionNeuroPsicologica } from '../interface/i-valoracion-neuropsicologica';
import { iAntecedenteNeuroPsiquiatrico } from '../interface/i-antecedente-neuro-psiquiatrico';
import { iPresuncion } from '../interface/i-presuncion';
import { iHistoriaFamSoc } from '../interface/i-historia-familiar-social';
import { iExamenFisicoSistema } from '../interface/i-examen-fisico-sistema';
import { iEstiloVidaDatos } from '../interface/i-estilo-vida-datos';
import { Funciones } from '../../shared/class/cls_Funciones';
import { WaitComponent } from '../../shared/components/wait/wait.component';

@Injectable({
  providedIn: 'root'
})
export class ExpdienteService {

  private _Cnx = new Conexion();
  @Output() change: EventEmitter<any> = new EventEmitter();
  private http: HttpClient;
  private IsDialogOpen : boolean = false;

  constructor(public _Dialog: MatDialog) { 

    this.http = new HttpClient(new HttpXhrBackend({ 
      build: () => new XMLHttpRequest() 
  }));

    this._Dialog.afterOpened.subscribe(() => {
      this.IsDialogOpen = true;
    });

    this._Dialog.afterAllClosed.subscribe(() => {
      this.IsDialogOpen = false;
    });
  }


  public GuardarPaciente(Paciente : iPaciente){



   
    document.getElementById("btn-guardar-paciente")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }




    this.http.post<any>(this._Cnx.Url()+ "cat/Paciente/Guardar", JSON.stringify(Paciente),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-paciente")?.removeAttribute("disabled");

        if(_json["esError"] == 1){
          this.change.emit(["dato_Paciente_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Paciente_Guardar", _json]);
      },
        err =>{
          dialogRef?.close();
          document.getElementById("btn-guardar-paciente")?.removeAttribute("disabled");
          this.change.emit(["dato_Paciente_Guardar", undefined]);
          this.Msj();
      }
    );


  }

  public BuscarPaciente(){
    this.http.get<any>(this._Cnx.Url() + "cat/Paciente/Buscar").subscribe(
      datos =>{
        this.change.emit(["Llenar_paciente", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

  public BuscarDatosPaciente(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/Expediente/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{

        this.change.emit(["Llenar_Datos_Paciente", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }


  public GuardarConsenso(Consenso : iConsenso){


    document.getElementById("btn-guardar-concenso")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }


    this.http.post<any>(this._Cnx.Url()+ "cat/Consenso/Guardar", JSON.stringify(Consenso),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-concenso")?.removeAttribute("disabled");

        if(_json["esError"] == 1){
          this.change.emit(["dato_Consenso_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Consenso_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
          document.getElementById("btn-guardar-concenso")?.removeAttribute("disabled");


          this.change.emit(["dato_Consenso_Guardar", undefined]);
          this.Msj();
      }
    );


  }

  public GuardarSOAP(Soap : iSistemaSoap){

    
    document.getElementById("btn-guardar-soap")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }


    this.http.post<any>(this._Cnx.Url()+ "cat/SOAP/Guardar", JSON.stringify(Soap),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-soap")?.removeAttribute("disabled");



        if(_json["esError"] == 1){
          this.change.emit(["dato_SOAP_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_SOAP_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
          document.getElementById("btn-guardar-soap")?.removeAttribute("disabled");
  
  
  
          this.change.emit(["dato_SOAP_Guardar", undefined]);
          this.Msj();
      }
    );    
  }


  public GuardarValoracion(Valoracion : iValoracionNeuroPsicologica){

    document.getElementById("btn-guardar-neuro")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }


    this.http.post<any>(this._Cnx.Url()+ "cat/Valoracion/Guardar", JSON.stringify(Valoracion),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-neuro")?.removeAttribute("disabled");


        if(_json["esError"] == 1){
          this.change.emit(["dato_Valoracion_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Valoracion_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
          document.getElementById("btn-guardar-neuro")?.removeAttribute("disabled");

          
          this.change.emit(["dato_Valoracion_Guardar", undefined]);
          this.Msj();
      }
    );


  }

  public BuscarValoracionNeuro(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/Valoracion/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Valoracion", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }




  public GuardarTratamiento(T : iTratamientoActual){

     
    document.getElementById("btn-guardar-tratamientoactual")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }


    this.http.post<any>(this._Cnx.Url()+ "cat/Tratamiento/Guardar", JSON.stringify(T),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-tratamientoactual")?.removeAttribute("disabled");

        if(_json["esError"] == 1){
          this.change.emit(["dato_Tratamiento_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Tratamiento_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
          document.getElementById("btn-guardar-tratamientoactual")?.removeAttribute("disabled");

          this.change.emit(["dato_Tratamiento_Guardar", undefined]);
          this.Msj();
      }
    );


  }


  public BuscarTratamiento(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/Tratamiento/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Tratamiento", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }


  public BuscarConcenso(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/Consenso/BuscarConsenso?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Concenso", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

  public BuscarSindrome(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/Consenso/BuscarSindrome?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Sindrome", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

  public BuscarHistoriaFamSoc(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/Historia/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Historia", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

 

  public EliminarTratamiento(IdTratamiento : Number){
    this.http.post<any>(this._Cnx.Url()+ "cat/Tratamiento/Eliminar?IdTratamiento=" + IdTratamiento,{headers: {"content-type":"application/text"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Tratamiento_Eliminar", undefined]);
          return;
        }
        this.change.emit(["dato_Tratamiento_Eliminar", _json]);
      },
        err =>{
          this.change.emit(["dato_Tratamiento_Eliminar", undefined]);
          this.Msj();
      }
    );
  }








  public GuardarAntecedenteQuirurgico(e : iAntecedenteQuirurgico){

    
    document.getElementById("btn-guardar-quirurgico")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }


    this.http.post<any>(this._Cnx.Url()+ "cat/AntecedenteQuirurgico/Guardar", JSON.stringify(e),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-quirurgico")?.removeAttribute("disabled");

        if(_json["esError"] == 1){
          this.change.emit(["dato_Antecedente_Quirurgico_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Antecedente_Quirurgico_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
        document.getElementById("btn-guardar-quirurgico")?.removeAttribute("disabled");

          this.change.emit(["dato_Antecedente_Quirurgico_Guardar", undefined]);
          this.Msj();
      }
    );


  }


  public BuscarAntecedenteQuirurgico(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/AntecedenteQuirurgico/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Antecedente_Quirurgico", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

  public EliminarAntecedenteQuirurgico(IdAntQ : Number){
    this.http.post<any>(this._Cnx.Url()+ "cat/AntecedenteQuirurgico/Eliminar?IdAntQ=" + IdAntQ,{headers: {"content-type":"application/text"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Antecedente_Quirurgico_Eliminar", undefined]);
          return;
        }
        this.change.emit(["dato_Antecedente_Quirurgico_Eliminar", _json]);
      },
        err =>{
          this.change.emit(["dato_Antecedente_Quirurgico_Eliminar", undefined]);
          this.Msj();
      }
    );
  }








  public GuardarExamenClinico(e : iExamenClinico){

      
    document.getElementById("btn-guardar-examenclinico")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }

    this.http.post<any>(this._Cnx.Url()+ "cat/ExamenClinico/Guardar", JSON.stringify(e),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-examenclinico")?.removeAttribute("disabled");

        if(_json["esError"] == 1){
          this.change.emit(["dato_Examen_Clinico_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Examen_Clinico_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
        document.getElementById("btn-guardar-examenclinico")?.removeAttribute("disabled");

          this.change.emit(["dato_Examen_Clinico_Guardar", undefined]);
          this.Msj();
      }
    );


  }


  public BuscarExamenClinico(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/ExamenClinico/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Examen_Clinico", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

  public EliminarExamenClinico(IdExamenClinico : Number){
    this.http.post<any>(this._Cnx.Url()+ "cat/ExamenClinico/Eliminar?IdExamenClinico=" + IdExamenClinico,{headers: {"content-type":"application/text"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Examen_Clinico_Eliminar", undefined]);
          return;
        }
        this.change.emit(["dato_Examen_Clinico_Eliminar", _json]);
      },
        err =>{
          this.change.emit(["dato_Examen_Clinico_Eliminar", undefined]);
          this.Msj();
      }
    );
  }






  public GuardarAntPatologico(e : iAntecedentePatologico){

    document.getElementById("btn-guardar-patologico")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }


    this.http.post<any>(this._Cnx.Url()+ "cat/AntPatologico/Guardar", JSON.stringify(e),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-patologico")?.removeAttribute("disabled");

        if(_json["esError"] == 1){
          this.change.emit(["dato_Ant_Patologico_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Ant_Patologico_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
        document.getElementById("btn-guardar-patologico")?.removeAttribute("disabled");

          this.change.emit(["dato_Ant_Patologico_Guardar", undefined]);
          this.Msj();
      }
    );


  }


  public BuscarAntPatologico(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/AntPatologico/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Ant_Patologico", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

  public EliminarAntPatologico(IdAntecedentePatologico : Number){
    this.http.post<any>(this._Cnx.Url()+ "cat/AntPatologico/Eliminar?IdAntecedentePatologico=" + IdAntecedentePatologico,{headers: {"content-type":"application/text"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Ant_Patologico_Eliminar", undefined]);
          return;
        }
        this.change.emit(["dato_Ant_Patologico_Eliminar", _json]);
      },
        err =>{
          this.change.emit(["dato_Ant_Patologico_Eliminar", undefined]);
          this.Msj();
      }
    );
  }










  public GuardarAntFamiliar(e : iAntecedentesFamiliares){

    document.getElementById("btn-guardar-familiar")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }



    this.http.post<any>(this._Cnx.Url()+ "cat/AntFamiliar/Guardar", JSON.stringify(e),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-familiar")?.removeAttribute("disabled");

        if(_json["esError"] == 1){
          this.change.emit(["dato_Ant_Familiar_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Ant_Familiar_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
        document.getElementById("btn-guardar-familiar")?.removeAttribute("disabled");

          this.change.emit(["dato_Ant_Familiar_Guardar", undefined]);
          this.Msj();
      }
    );


  }


  public BuscarAntFamiliar(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/AntFamiliar/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Ant_Familiar", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

  public EliminarAntFamiliar(IdAntecedente : Number){
    this.http.post<any>(this._Cnx.Url()+ "cat/AntFamiliar/Eliminar?IdAntecedente=" + IdAntecedente,{headers: {"content-type":"application/text"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Ant_Familiar_Eliminar", undefined]);
          return;
        }
        this.change.emit(["dato_Ant_Familiar_Eliminar", _json]);
      },
        err =>{
          this.change.emit(["dato_Ant_Familiar_Eliminar", undefined]);
          this.Msj();
      }
    );
  }
  

  








  public GuardarAntNeuroPsiquiatrico(e : iAntecedenteNeuroPsiquiatrico){
    this.http.post<any>(this._Cnx.Url()+ "cat/AntNeuroPsiquiatrico/Guardar", JSON.stringify(e),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Ant_NeuroPsiquiatrico_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Ant_NeuroPsiquiatrico_Guardar", _json]);
      },
        err =>{
          this.change.emit(["dato_Ant_NeuroPsiquiatrico_Guardar", undefined]);
          this.Msj();
      }
    );


  }


  public BuscarAntNeuroPsiquiatrico(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/AntNeuroPsiquiatrico/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Ant_NeuroPsiquiatrico", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

  public EliminarAntNeuroPsiquiatrico(IdAntNeuroPsiq : Number){
    this.http.post<any>(this._Cnx.Url()+ "cat/AntNeuroPsiquiatrico/Eliminar?IdAntNeuroPsiq=" + IdAntNeuroPsiq,{headers: {"content-type":"application/text"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Ant_NeuroPsiquiatrico_Eliminar", undefined]);
          return;
        }
        this.change.emit(["dato_Ant_NeuroPsiquiatrico_Eliminar", _json]);
      },
        err =>{
          this.change.emit(["dato_Ant_NeuroPsiquiatrico_Eliminar", undefined]);
          this.Msj();
      }
    );
  }




  
  public GuardarAntPresuncion(e : iPresuncion){

    document.getElementById("btn-guardar-presuncion")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }



    this.http.post<any>(this._Cnx.Url()+ "cat/AntPresuncion/Guardar", JSON.stringify(e),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-presuncion")?.removeAttribute("disabled");

        if(_json["esError"] == 1){
          this.change.emit(["dato_Ant_Presuncion_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Ant_Presuncion_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
          document.getElementById("btn-guardar-presuncion")?.removeAttribute("disabled");

          this.change.emit(["dato_Ant_Presuncion_Guardar", undefined]);
          this.Msj();
      }
    );


  }


  public BuscarAntPresuncion(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/AntPresuncion/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Ant_Presuncion", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }

  public EliminarAntPresuncion(IdAnalisiPresuncion : Number){
    this.http.post<any>(this._Cnx.Url()+ "cat/AntPresuncion/Eliminar?IdAnalisiPresuncion=" + IdAnalisiPresuncion,{headers: {"content-type":"application/text"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);
        if(_json["esError"] == 1){
          this.change.emit(["dato_Ant_Presuncion_Eliminar", undefined]);
          return;
        }
        this.change.emit(["dato_Ant_Presuncion_Eliminar", _json]);
      },
        err =>{
          this.change.emit(["dato_Ant_Presuncion_Eliminar", undefined]);
          this.Msj();
      }
    );
  }


  public GuardarHistoriaMedSoc(Historia : iHistoriaFamSoc){


    
    document.getElementById("btn-guardar-historiamedica")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }


    this.http.post<any>(this._Cnx.Url()+ "cat/Historia/Guardar", JSON.stringify(Historia),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-historiamedica")?.removeAttribute("disabled");

        if(_json["esError"] == 1){
          this.change.emit(["dato_Historia_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Historia_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
        document.getElementById("btn-guardar-historiamedica")?.removeAttribute("disabled");

          this.change.emit(["dato_Historia_Guardar", undefined]);
          this.Msj();
      }
    );


  }












  public GuardarExamenFisicoSistema(e : iExamenFisicoSistema[]){

    document.getElementById("btn-guardar-fisico")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }


    this.http.post<any>(this._Cnx.Url()+ "cat/ExamenFisicoSistema/Guardar", JSON.stringify(e),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-fisico")?.removeAttribute("disabled");

        if(_json["esError"] == 1){
          this.change.emit(["dato_Examen_Fisico_Sistema_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Examen_Fisico_Sistema_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
        document.getElementById("btn-guardar-fisico")?.removeAttribute("disabled");

          this.change.emit(["dato_Examen_Fisico_Sistema_Guardar", undefined]);
          this.Msj();
      }
    );


  }

  public BuscarExamenFisicoSistema(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/ExamenFisicoSistema/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Examen_Fisico_Sistema", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }





  public GuardarEstiloVida(e : iEstiloVidaDatos){

    document.getElementById("btn-guardar-vida")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this._Dialog.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this._Dialog.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }


    this.http.post<any>(this._Cnx.Url()+ "cat/EstiloVida/Guardar", JSON.stringify(e),{headers: {"content-type":"application/json"}}).subscribe(
      dato=>{
        let _json =  JSON.parse(dato);

        dialogRef?.close();
        document.getElementById("btn-guardar-vida")?.removeAttribute("disabled");



        if(_json["esError"] == 1){
          this.change.emit(["dato_Estilo_Vida_Guardar", undefined]);
          return;
        }
        this.change.emit(["dato_Estilo_Vida_Guardar", _json]);
      },
        err =>{

          dialogRef?.close();
          document.getElementById("btn-guardar-vida")?.removeAttribute("disabled");

          
          this.change.emit(["dato_Estilo_Vida_Guardar", undefined]);
          this.Msj();
      }
    );


  }

  public BuscarEstiloVida(IdPaciente : Number){
    this.http.get<any>(this._Cnx.Url() + "cat/EstiloVida/Buscar?IdPaciente="  + IdPaciente).subscribe(
      datos =>{
        this.change.emit(["Llenar_Estilo_Vida", datos]);
      },
      err =>{
        this.Msj();
      }
    );
  }


  private Msj () : void{


    let s : string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\""+ 1 + "\",\"Mensaje\":\""+ "Error al conectar con el servidor."+ "\"}"+ ", \"count\":"+ 0 + ", \"esError\":"+ 1 + "}";
    let _json = JSON.parse(s);

    this._Dialog.open(DialogoComponent, {
      data: _json["msj"],
    });


  }
}
