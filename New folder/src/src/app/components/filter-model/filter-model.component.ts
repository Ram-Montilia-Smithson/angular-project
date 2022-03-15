import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// --------------------------------------------
// use : 
//   <app-filter-cards [data]=[] [filters]=[] (filteredData)='fun($event)'></app-filter-cards>
// --------------------------------------------
export interface FilterModel {
  name: string;
  filterValue: string;
  urlSrc: string;
  count:number;
}

@Component({
  selector: 'app-filter-model',
  templateUrl: './filter-model.component.html',
  styleUrls: ['./filter-model.component.scss']
}) 

export class FilterModelComponent implements OnInit {
  public filterValue: string = 'all';
  @Input() public data: any[];
  @Input() public filters: FilterModel[];
  @Output() public filteredData:EventEmitter<any[]> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.filterValueHandler('all');
  }

  public filterValueHandler(value: string): void{
    this.filterValue = value;
    let arr = this.data.filter((item) => item.filterValue === this.filterValue || this.filterValue === 'all');
    this.filteredData.emit(arr);
  }

}
