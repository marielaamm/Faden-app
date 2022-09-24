import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iDepartamento } from '../../interface/i-departamento';
import { CatalogoService } from '../../service/catalogo.service';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { iMunicipio } from '../../interface/i-municipio';
import { IgxComboComponent } from 'igniteui-angular';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss']
})
export class MunicipioComponent implements OnInit {


  @ViewChild('txtDepartamento', {static : true})
  public igxComboDepartamento: IgxComboComponent;

  public val: Validacion = new Validacion();

  public lstDepartamento: iDepartamento[] = [];
  private _CatalogoService: CatalogoService;


  constructor(private ServerScv: ServerService, private _Dialog: MatDialog) {
    this.val.add("txtMunicipio", "1", "LEN>", "0");
    this.val.add("txtMunicipio", "2", "LEN<=", "50");
    this.val.add("txtDepartamento", "1", "LEN>", "0");

    this._CatalogoService = new CatalogoService(this._Dialog);
    this.Limpiar();
    this._CatalogoService.BuscarDpto("");

  }


  private Limpiar(){
    this.val.ValForm.get("txtMunicipio")?.setValue("");
    this.val.ValForm.get("txtDepartamento")?.setValue("");


  }

  public seleccion_Departamento(event : any){

    if (event.added.length){
      event.newSelection = event.added;
      let _Fila : any = this.lstDepartamento.find(f=> f.Codigo == event.added);
      this.val.ValForm.get("txtDepartamento")?.setValue([_Fila.Codigo]);
    }
      this.igxComboDepartamento.close();

  }


  public f_key_Enter_Departamento(event: any){

    if(event.key == "Enter"){

      let _Item : any = this.igxComboDepartamento.dropdown;
      this.igxComboDepartamento.setSelectedItem([_Item._focusedItem.value.Codigo]);
      this.val.ValForm.get("txtDepartamento")?.setValue([_Item._focusedItem.value.Codigo]);

    }


  }




  

  private LlenarDpto(datos: string): void {

    let _json = JSON.parse(datos);

    _json["d"].forEach(
      (b: any) => {
        this.lstDepartamento.push({ IdDepartamento: b.IdDepto, Codigo: b.Codigo, Departamento: b.Nombre });
      }
    );

  }





  public v_Guardar(): void {
    let esError: string = "";
    let mensaje: string = "<ol>";

    if (this.val.ValForm.get("txtMunicipio")?.invalid) {
      mensaje += "<li>Ingrese el nombre del Municipio o revise la cantidada de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtDepartamento")?.invalid) {
      mensaje += "<li>Seleccione un departamento</li>"
      esError += "1";
    }
    mensaje += "</ol>";

    if (esError.includes("1")) {
      let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + mensaje + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";

      let _json = JSON.parse(s);
      this._Dialog.open(DialogoComponent, {
        data: _json["msj"]
      });
      return;


    }
    
    let _Fila : any = this.lstDepartamento.find(f => f.IdDepartamento == this.val.ValForm.get("txtDepartamento")?.value);
    let M: iMunicipio = {}as iMunicipio;
    M.IdCiudad = 0;
    M.Nombre  = this.val.ValForm.get("txtMunicipio")?.value;
    M.IdDepto = _Fila.IdDepartamento;
    this._CatalogoService.GuardarMunicipio(M);

  }


  Cerrar(): void {

    this.ServerScv.CerrarFormulario();

  }

  ngOnInit(): void {


    this._CatalogoService.change.subscribe(s => {

      if (s instanceof Array) {
        if (s[0] == "Llenar_departamento") {
          this.LlenarDpto(s[1]);
        }

        if (s[0] == "dato_Municipio_Guardar") {

          this.val.ValForm.enable();

          if (s[1] == undefined) {

            let s: string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\"" + 1 + "\",\"Mensaje\":\"" + "Error al guardar." + "\"}" + ", \"count\":" + 0 + ", \"esError\":" + 1 + "}";
            let _json = JSON.parse(s);

            this._Dialog.open(DialogoComponent, {
              data: _json["msj"],
            });

            return;
          }
          this.Limpiar();



        }

      }





    });



  }





}
