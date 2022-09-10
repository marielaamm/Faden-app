import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  @Output() change: EventEmitter<any> = new EventEmitter();
  

  public IsDialogOpen : boolean = false;

    constructor(){
    
     
      
    }


    public CerrarFormulario() : void{
      this.change.emit("CerrarForm");
    }
}
