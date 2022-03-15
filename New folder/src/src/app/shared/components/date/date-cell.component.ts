import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date-cell.component.html',
  styleUrls: ['./date-cell.component.scss']
})
export class DateCellComponent implements OnInit {

  @Input() public value: Date
  @Input() public size: number
  @Input() public format: string

  constructor() { }

  ngOnInit(): void {
    this.value = this.value || new Date()
  }

}
