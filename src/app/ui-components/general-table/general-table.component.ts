import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.css']
})
export class GeneralTableComponent implements OnInit {

  @Input() data: any[];
  public displayedColumns = ['id', 'goal', 'measures', 'comment', 'score'];
  public dataSource: MatTableDataSource<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
