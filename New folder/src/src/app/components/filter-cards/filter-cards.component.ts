import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// --------------------------------------------
// use : 
//   <app-filter-cards [data]=[] [filters]=[] (filteredData)='fun($event)'></app-filter-cards>
// --------------------------------------------
export interface FilterModel {
  name: string;
  filterValue: string;
  count?:number;
  urlSrc: string;
}

@Component({
  selector: 'app-filter-cards',
  templateUrl: './filter-cards.component.html',
  styleUrls: ['./filter-cards.component.scss']
}) 

export class FilterCardsComponent implements OnInit {
  public filterValue: string = 'all';
  @Input() public totalCount:number;
  @Input() public data: any[];
  @Input() public filters: FilterModel[];
  @Output() public filteredData:EventEmitter<any[]> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.filterValueHandler('all');
    this.totalCount = this.getTotalNumber(this.filters);
  }
  public getTotalNumber(arr:FilterModel[]):number {
    let num:number = 0;
    arr.map(i => num += i.count);
    return num;
  }
  public filterValueHandler(value: string): void{
    if(this.data){
    this.filterValue = value;
    let arr = this.data.filter((item) => item.kodMishpacha === this.filterValue || this.filterValue === 'all');
    this.filteredData.emit([this.filterValue]);
    }
  }

}
