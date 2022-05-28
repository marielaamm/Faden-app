import { Component, OnInit } from '@angular/core';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  bol_HidePass : boolean = true;
  bol_Load : boolean = false;
  bol_Recordar : boolean = false;

  val = new Validacion();

  
  constructor(private ServerScv : ServerService) {

    this.val.add("txtUsuario", "1","LEN>", "0");
    this.val.add("txtUsuario", "2","LEN>=", "3");
    this.val.add("txtPass", "1", "LEN>", "0");
    this.val.add("txtPass", "2", "LEN>=", "3");
    this.val.add("chkRecordar", "1", "LEN>=", "0");
   }

   InicioSesion() : void{

    if(this.val.ValForm.invalid || this.bol_Load ) return;

    this.val.ValForm.get("txtLoginUsuario")?.disable();
    this.val.ValForm.get("txtLoginPass")?.disable();
    this.val.ValForm.get("chkRecordar")?.disable();
    this.bol_Load = true;
    this.ServerScv._loginserv.InicioSesion(this.val.ValForm.get("txtUsuario")?.value, this.val.ValForm.get("txtPass")?.value, this.bol_Recordar);
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
      this.InicioSesion();
    }

    event.preventDefault();

  }

  Recordar() : void{
    this.bol_Recordar = !this.bol_Recordar;
  }
  
  ngOnInit(): void {

    this.ServerScv._loginserv.change.subscribe(s =>{


      this.val.ValForm.get("txtUsuario")?.enable();
      this.val.ValForm.get("txtPass")?.enable();
      this.val.ValForm.get("chkRecordar")?.enable();
      this.bol_Load = false
     
    });
  }

}
