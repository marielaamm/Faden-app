import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iDepartamento } from '../../interface/i-departamento';
import { CatalogoService } from '../../service/catalogo.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {
  
  public val: Validacion = new Validacion();
  private _CatalogoService:CatalogoService;
  private EsModal:boolean= false;
  private Id : Number=0;


  constructor(private ServerScv: ServerService, private _Dialog: MatDialog) {
    this.val.add("txtCodigo", "1", "LEN>", "0");
    this.val.add("txtCodigo", "2", "LEN<=", "5");
    this.val.add("txtDepartamento", "1", "LEN>", "0");
    this.val.add("txtDepartamento", "2", "LEN<=", "50");
    this.limpiar();

    this._CatalogoService = new CatalogoService(this._Dialog);

  }
  private limpiar(){
    this.val.ValForm.get("txtCodigo")?.setValue("");
    this.val.ValForm.get("txtDepartamento")?.setValue("");

  }
  public v_Guardar(): void {
    let esError: string = " ";
    let mensaje: string = " <ol>";

    if (this.val.ValForm.get("txtCodigo")?.invalid) {
      mensaje += "<li>Ingrese el código del departamento o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtDepartamento")?.invalid) {
      mensaje += "<li>El nombre del departamento no debe exceder 50 caracteres</li>";
      esError += "1";
    }

    mensaje += "</ol>"

    if (esError.includes("1")) {
      let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + mensaje + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
      let _json = JSON.parse(s);
      this._Dialog.open(DialogoComponent, {

        data: _json["msj"]
      });

      return;

    }

    let D: iDepartamento = {}as iDepartamento;
    D.IdDepartamento = this.Id;
    D.Codigo = this.val.ValForm.get("txtCodigo")?.value;
    D.Departamento = this.val.ValForm.get("txtDepartamento")?.value;
    this._CatalogoService.GuardarDepartamento(D);

  
  }

  public EditarDepartamento(fila: iDepartamento){

    this.EsModal= true;
    this.Id=fila.IdDepartamento;
    this.val.ValForm.get("txtCodigo")?.setValue(fila.Codigo);
    this.val.ValForm.get("txtDepartamento")?.setValue(fila.Departamento);
    

  }


  Cerrar(): void {

    if(this.EsModal)
    {
      this.ServerScv.change.emit(["CerrarDialog","frmDepartamento", ""]);
    }
    else
    {
      
      this.ServerScv.CerrarFormulario();
    }

  }
  ngOnInit(): void {

    this.ServerScv.change.subscribe(s => {

      if (s instanceof Array) {
        if (s[0] == "DatosModal" && s[1] == "modal-registro-departamento") {
          console.log(s[2]);
        }
      }

     
    });

    this._CatalogoService.change.subscribe(

      s =>{
        if (s[0] == "dato_Departamento_Guardar") {

          this.val.ValForm.enable();
  
          if (s[1] == undefined) {
  
            let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + "error al guardar" + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
            let _json = JSON.parse(s);
            this._Dialog.open(DialogoComponent, {
              data: _json["msj"]
            });
            return;
          }
          this._Dialog.open(DialogoComponent, {
            data: s[1]["msj"],
          });
          
          if(this.EsModal){
            this.Cerrar();
          }
          else
          {
            this.limpiar()
          }
      } 
      

      }
    );

  }



}
