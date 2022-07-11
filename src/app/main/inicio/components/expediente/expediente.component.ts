import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.scss']
})
export class ExpedienteComponent implements OnInit {

  public estadoPanel = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
