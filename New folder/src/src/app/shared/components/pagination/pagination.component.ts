import { PaginationInstance } from 'ngx-pagination';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'kkl-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() public pagination: PaginationInstance ;

  @Input() paginationCount: number;
  @Input() maxSize: number;

  @Output() newPage: EventEmitter<number> = new EventEmitter();


  public labels: any = {
    previousLabel: 'הקודם',
    nextLabel: 'הבא',
};

  constructor() { }

  ngOnInit(): void {
  }

  public onPageChange(number) {
    this.pagination.currentPage = number;
  }
}
