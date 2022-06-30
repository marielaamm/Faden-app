import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historiamedica',
  templateUrl: './historiamedica.component.html',
  styleUrls: ['./historiamedica.component.scss']
})
export class HistoriamedicaComponent implements OnInit {

  public lstPaciente:{}[]=[];

  constructor() { }


  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

  ngOnInit(): void {
  }

}
