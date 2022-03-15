import { AfterViewInit, OnInit, Component, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {  Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AllSearchUnitsForWorkDilution } from 'src/app/Models/AllSearchUnitsForWorkDilution';
import { GridScreenService } from 'src/app/services/grid-screen.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements  OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  workUnit  = [""];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  objectTosearcForWorkUnit: any;
  searchWorkUnit:AllSearchUnitsForWorkDilution= new AllSearchUnitsForWorkDilution();
  constructor(private activeRoute:ActivatedRoute,private GridScreenService:GridScreenService,private cdr:ChangeDetectorRef ) {
this.searchWorkUnit= this.GridScreenService.workUnitToSend;
  }
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
  }
  getlistOfGlobalId(e:any){
    this.workUnit =e;// ['fcfbd980-ae87-4e3e-8043-e8a7a47c135d','dfd46cce-5fa4-491d-a93b-3f08c6abed01','d0314ebf-97d1-47d9-9900-dfb713a5641f'];
  }
}
