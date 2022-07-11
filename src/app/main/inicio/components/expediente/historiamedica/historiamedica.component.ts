import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-historiamedica',
  templateUrl: './historiamedica.component.html',
  styleUrls: ['./historiamedica.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoriamedicaComponent implements OnInit {

  public lstPaciente:{}[]=[];
  public isLinear = false;

  constructor() { }


  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

  ngOnInit(): void {
  }

}
