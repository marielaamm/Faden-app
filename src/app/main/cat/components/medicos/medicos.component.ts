import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { DialogoComponent } from 'src/app/main/shared/components/dialogo/dialogo.component';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { iMedicos } from '../../interface/i-medicos';
import { CatalogoService } from '../../service/catalogo.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {
  public lstMunicipio: {}[] = [];
  public val: Validacion = new Validacion();
  private _CatalogoService: CatalogoService;

  constructor(private ServerScv: ServerService, private _Dialog: MatDialog) {

    this.val.add("txtNoExpediente", "1", "LEN>=", "0");
    this.val.add("txtFecha", "1", "LEN>", "0");
    this.val.add("txtPrimerNombre", "1", "LEN>", "0");
    this.val.add("txtSegundoNombre", "1", "LEN>", "0");
    this.val.add("txtPrimerApellido", "1", "LEN>", "0");
    this.val.add("txtSegundoApellido", "1", "LEN>", "0");
    this.val.add("txtMunicipio", "1", "LEN>", "0");
    this.val.add("txtFechaNacimiento", "1", "LEN>", "0");
    this.val.add("txtEdad", "1", "LEN>", "0");
    this.val.add("txtCedula", "1", "LEN>", "0");
    this.val.add("txtEspecialidad", "1", "LEN>", "0");
    this.val.add("txtDireccion", "1", "LEN>", "0");
    this.val.add("txtCorreo", "1", "LEN>", "0");
    this.val.add("txtTelefono", "1", "LEN>", "0");
    this.val.add("txtCelular", "1", "LEN>", "0");
    this.limpiar();

    this._CatalogoService = new CatalogoService(this._Dialog);

  }

  private limpiar() {
    this.val.ValForm.get("txtNoExpediente")?.setValue("");
    this.val.ValForm.get("txtFecha")?.setValue("");
    this.val.ValForm.get("txtPrimerNombre")?.setValue("");
    this.val.ValForm.get("txtSegundoNombre")?.setValue("");
    this.val.ValForm.get("txtPrimerApellido")?.setValue("");
    this.val.ValForm.get("txtSegundoApellido")?.setValue("");
    this.val.ValForm.get("txtMunicipio")?.setValue("");
    this.val.ValForm.get("txtFechaNacimiento")?.setValue("");
    this.val.ValForm.get("txtEdad")?.setValue("");
    this.val.ValForm.get("txtCedula")?.setValue("");
    this.val.ValForm.get("txtEspecialidad")?.setValue("");
    this.val.ValForm.get("txtDireccion")?.setValue("");
    this.val.ValForm.get("txtCorreo")?.setValue("");
    this.val.ValForm.get("txtTelefono")?.setValue("");
    this.val.ValForm.get("txtCelular")?.setValue("");

  }


  public singleSelection(event: any) {
    if (event.added.length) {
      event.newSelection = event.added;
    }
  }

  public Guardar(): void {
    let esError: string = " ";
    let mensaje: string = " <ol>";

    if (this.val.ValForm.get("txtNoExpediente")?.invalid) {
      mensaje += "<li>Ingrese el código del médico o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtFecha")?.invalid) {
      mensaje += "<li>Digite la fecha de ingreso o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtPrimerNombre")?.invalid) {
      mensaje += "<li>Ingrese el primer nombre o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtSegundoNombre")?.invalid) {
      mensaje += "<li>Ingrese el segundo nombre o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtPrimerApellido")?.invalid) {
      mensaje += "<li>Ingrese el primer apellido o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtSegundoApellido")?.invalid) {
      mensaje += "<li>Ingrese el segundo apellido o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtMunicipio")?.invalid) {
      mensaje += "<li>Ingrese el nombre del municipio o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtFechaNacimiento")?.invalid) {
      mensaje += "<li>Ingrese la fecha de nacimiento o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtEdad")?.invalid) {
      mensaje += "<li>Ingrese la edad o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtCedula")?.invalid) {
      mensaje += "<li>Ingrese el numero de cedulo o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtEspecialidad")?.invalid) {
      mensaje += "<li>Ingrese la especialidad médica o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtDireccion")?.invalid) {
      mensaje += "<li>Ingrese la direccion o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtCorreo")?.invalid) {
      mensaje += "<li>Ingrese el correo electrónico o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtTelefono")?.invalid) {
      mensaje += "<li>Ingrese el numero telefónico o revise la cantidad de caracteres</li>";
      esError += "1";
    }

    if (this.val.ValForm.get("txtCelular")?.invalid) {
      mensaje += "<li>Ingrese el número de celular o revise la cantidad de caracteres</li>";
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

    let M: iMedicos = {}as iMedicos;
    M.IdMedico = 0;
    M.FechaIngreso = this.val.ValForm.get("txtFecha")?.value;
    M.PNombre = this.val.ValForm.get("txtPrimerNombre")?.value;
    M.SNombre=this.val.ValForm.get("txtSegundoNombre")?.value;
    
    this._CatalogoService.GuardarMedicos(M);

  }


  Cerrar(): void {

    this.ServerScv.CerrarFormulario();
  }

  ngOnInit(): void {


  }

}
