import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
@Input() treeTypes: { name: string; filterValue: string; count: number; urlSrc: string }[]=[]
@Output() filterValueEmitter:EventEmitter<string>=new EventEmitter()
filterValue:string='all'
  constructor() { }

  ngOnInit(): void {
  }

  filterClickedHandler(filterValue){
    this.filterValue=filterValue
this.filterValueEmitter.emit(filterValue)
  }
}
