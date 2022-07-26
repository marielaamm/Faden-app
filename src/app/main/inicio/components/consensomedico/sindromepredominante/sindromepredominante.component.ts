import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { iSindromePredominante } from '../../../interface/i-sindromepredominante';

let ELEMENT_DATA:iSindromePredominante[]=[];

@Component({
  selector: 'app-sindromepredominante',
  templateUrl: './sindromepredominante.component.html',
  styleUrls: ['./sindromepredominante.component.scss']
})
export class SindromepredominanteComponent implements OnInit {

  displayedColumns: string[] = ["IdSindrome","Tiposindrome"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<iSindromePredominante>();
  private _liveAnnouncer:any;

  constructor() { }

  ngOnInit(): void {
  }

}
