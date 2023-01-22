import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iRol } from '../../Interface/i-Rol';
import { SistemaService } from '../../service/sistema.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public cities: { name: string, id: string }[] = [];
  public val = new Validacion();
  private EsModal:boolean= false;
  private serviceSIS : SistemaService
  public bol_Guardando : boolean = false;
  private Id : Number=0;
  
  constructor(private ServerScv : ServerService,   private _Dialog: MatDialog) {
    this.val.add("txtRol", "1","LEN>", "0");

    this.serviceSIS = new SistemaService(_Dialog);
    this.Limpiar();

   }


   public Guardar(): void {
    let esError: string = " ";
    let mensaje: string = " <ol>";

   if (this.val.ValForm.get("txtRol")?.invalid) {
    mensaje += "<li>Ingrese el Rol</li>";
    esError += "1";
  }

  mensaje += "</ol>"

  if (esError.includes("1")) {
    let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Guardar\":\"" + 1 + "\",\"Mensaje\":\"" + mensaje + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
    let _json = JSON.parse(s);
    this._Dialog.open(DialogoComponent, {

      data: _json["msj"]
    });

    return;

  }


  let E: iRol = {}as  iRol;

  E.IdRol = this.Id;
  E.Rol1 = this.val.ValForm.get("txtRol")?.value;
  E.Activo = true;
  this.serviceSIS.GuardarRol(E);
  

   }

   public EditarRol(fila: iRol){

    this.EsModal= true;
    this.Id=fila.IdRol;
    this.val.ValForm.get("txtRol")?.setValue(fila.Rol1);
  
   }


   Limpiar()
   {
    this.bol_Guardando = false;
    this.val.ValForm.get("txtRol")?.setValue("");


   }

 Cerrar() : void{

  if(this.EsModal)
  {
    this.ServerScv.change.emit(["CerrarDialog","frmRoles", ""]);
  }
  else
  {
    
    this.ServerScv.CerrarFormulario();
  }
    
}

  ngOnInit(): void {
    this.ServerScv.change.subscribe(s =>{

      if(s instanceof Array){
        if(s[0] == "DatosModal" && s[1] == "modal-registro-escolaridad" ) {
          console.log(s[2]);
        }
      }

    });
    this.serviceSIS.change.subscribe(

      s =>{
        if (s[0] == "dato_Rol_Guardar") {

          this.val.ValForm.enable();
  
          if (s[1] == undefined) {
  
            let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + "error al guardar" + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
            let _json = JSON.parse(s);
            this._Dialog.open(DialogoComponent, {
              data: _json["msj"]
            });
            return;
          }
          
          if(this.EsModal){
            this.Cerrar();
          }
          else
          { 
            
            this._Dialog.open(DialogoComponent, {
            data: s[1]["msj"]
          });

          this.Limpiar();

 
          }
      } 
      

      }
    );

    
  }

}
