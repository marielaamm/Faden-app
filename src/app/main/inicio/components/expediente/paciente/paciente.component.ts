import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { iMunicipio } from 'src/app/main/cat/interface/i-municipio';
import { CatalogoService } from 'src/app/main/cat/service/catalogo.service';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})

export class PacienteComponent implements OnInit {
  public lstMunicipio: iMunicipio[] = [];
  public lstEscolaridad:{}[]=[];

  constructor(private ServerScv : ServerService) {
   }


  private LlenarCiudad(datos:string):void{

    let _json = JSON.parse(datos);

    _json["d"].forEach(
      (b:any)=>{
        this.lstMunicipio.push(b);
      }
    );
    
  }

  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

  Cerrar() : void{
    
    this.ServerScv.CerrarFormulario();
  }
  
  ngOnInit(): void {

    /*this.ServerScv._PruebaService.change.subscribe(s =>{

      if(s[0] == "Llenar_ciudad"){
        this.LlenarCiudad(s[1]);
      }
    });*/

    
    
  }

}
/** 
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

/** @title Basic checkboxes
 
@Component({
  selector: 'checkbox-overview-example',
  templateUrl: 'checkbox-overview-example.html',
  styleUrls: ['checkbox-overview-example.css'],
})
export class CheckboxOverviewExample {
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
}*/