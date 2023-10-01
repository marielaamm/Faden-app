import { DatePipe, formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class Funciones {

  private _TiempoDesconexion : number = 0;
  public IdMedico : number = 15;

  public FechaServer: Date = new Date();

  public TiempoDesconexion() : number{
    return this._TiempoDesconexion;
  }
  

  private datePipe: DatePipe = new DatePipe('en-US');



  constructor(public DIALOG: MatDialog) {

  }



  public FechaServidor(f  : Date) {
    this.FechaServer = new Date(
      this.DateFormat(f, 'yyyy-MM-dd hh:mm:ss')
    );
  }
  

  public ShortFechaServidor() : string {
    return this.DateFormat(this.FechaServer, 'yyyy-MM-dd')
  }


    
  public SetTiempoDesconexion(n : number) : void{
     this._TiempoDesconexion = n;
  }




  public DateAdd(Tipo: string, Fecha: Date, Num: number): string {
    let f = new Date(Fecha);
    switch (Tipo) {
      case 'Day':
        return this.DateFormat(new Date(f.setDate( f.getDate() + Num)), 'yyyy-MM-dd');
        break;

      case 'Month':
        return this.DateFormat(
          new Date(f.setMonth(f.getMonth() + Num)),
          'yyyy-MM-dd'
        );
        break;

      case 'Year':
        return this.DateFormat(
          new Date(f.setFullYear(f.getFullYear() + Num)),
          'yyyy-MM-dd'
        );
        break;
    }

    return this.DateFormat(f, 'yyyy-MM-dd');
  }

  
  public LastDay(Fecha: Date): string {
    let f = new Date(Fecha.getFullYear(), Fecha.getMonth() + 1);

    return this.DateFormat(f, 'yyyy-MM-dd');
  }

  public DateFormat(fecha: Date, formart: string): string {
    return this.datePipe.transform(fecha, formart)!;
  }



}


