import { Component, OnInit, ViewChild } from '@angular/core';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { LoginService } from '../../service/login.service';
import { DialogErrorComponent } from 'src/app/main/shared/components/dialog-error/dialog-error.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormDirective } from 'src/app/main/shared/directive/dynamic-form.directive';
import { Validacionv2 } from 'src/app/main/shared/class/validacionV2';
import { WaitComponent } from 'src/app/main/shared/components/wait/wait.component';
import { Funciones } from 'src/app/main/shared/class/cls_Funciones';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {

  @ViewChild(DynamicFormDirective, { static: true }) DynamicFrom!: DynamicFormDirective;
  
  bol_HidePass : boolean = true;
  bol_Load : boolean = false;
  bol_Recordar : boolean = false;

  val = new Validacionv2();

  
  constructor(private _SrvLogin: LoginService, private DIALOG: MatDialog, private cFunciones : Funciones) {

    this.val.add(
      "txtUsuario",
      "1",
      "LEN>",
      "0",
      "Usuario",
      "El usuario es requerido."
    );
    this.val.add(
      "txtPass",
      "1",
      "LEN>",
      "0",
      "Contraseña",
      "La contraseña es requerida"
    );
    this.val.add(
      "txtPass",
      "2",
      "LEN>=",
      "3",
      "",
      "La contraseña debe de contener almenos 3 caracteres."
    );

  
    this.v_Limpiar();
    this._SrvLogin.isLogin();

   }


  onKeyEnter(event: any){
    

    let _input : string = event.target.id;

    if(event.target.value == "") {
      document?.getElementById(_input)?.focus();
      event.preventDefault();
      return;
    }

    if(_input == "txtUsuario")
    {
      document?.getElementById("txtPass")?.focus();
    }

    if(_input == "txtPass")
    {
      this.v_Iniciar();
    }

    event.preventDefault();

  }

 
  private v_Limpiar() {
    this.val.ValForm.get("txtUsuario")?.setValue("");
    this.val.ValForm.get("txtPass")?.setValue("");
    this.val.Iniciar = true;

    this.DynamicFrom?.viewContainerRef.clear();
    this.DIALOG.closeAll();
  }

  public v_Iniciar(): void {
    if (this.val.EsValido()) {

      
      
    document.getElementById("btnLogin")?.setAttribute("disabled", "disabled");



    let dialogRef : any = this.cFunciones.DIALOG.getDialogById("wait") ;


      if(dialogRef == undefined)
      {
        dialogRef = this.cFunciones.DIALOG.open(
          WaitComponent,
          {
            panelClass: "faden-dialog-full-blur",
            data: "",
            id : "wait"
          }
        );
  
      }


      this._SrvLogin.Session(this.val.ValForm.get("txtUsuario")?.value!, this.val.ValForm.get("txtPass")?.value!);
    } else {

      let dialogRef: MatDialogRef<DialogErrorComponent> = this.DIALOG.open(
        DialogErrorComponent,
        {
          data: this.val.Errores,
        }
      );

    }
  }



}
