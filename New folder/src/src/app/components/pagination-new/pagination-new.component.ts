import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-pagination-new',
  templateUrl: './pagination-new.component.html',
  styleUrls: ['./pagination-new.component.scss']
})
export class PaginationNewComponent implements OnInit {

  constructor() { }

  @Input() pagination : MatPaginator

  @Input() public config: PaginationInstance ;

  @Input() paginationCount: number;
  @Input() maxSize: number;

  @Output() newPage: EventEmitter<number> = new EventEmitter();


  public labels: any = {
    previousLabel: 'הקודם',
    nextLabel: 'הבא',
};


  ngOnInit(): void {
  }

  public onPageChange(number) {
    this.config.currentPage = number;
  }
}