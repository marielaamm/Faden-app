import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-confirmar',
  templateUrl: './dialogo-confirmar.component.html',
  styleUrls: ['./dialogo-confirmar.component.scss']
})
export class DialogoConfirmarComponent implements OnInit {

  public retorno: string="0";
  public titulo: String="";
  public mensaje: string="Continuar";
  public texto: String="";
  public btn1: String="";
  public btn2: String="";

  constructor(public hostElement: ElementRef, public dialogRef: MatDialogRef<DialogoConfirmarComponent>) { }

  public Confirmar(){
    this.dialogRef.close();
    this.retorno="1";
    
  }

  public Cancelar(){
    this.dialogRef.close();
    this.retorno="0";

  }
  ngOnInit(): void {
  }

}
