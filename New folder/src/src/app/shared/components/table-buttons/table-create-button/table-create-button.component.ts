import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableEvent } from '../../table/table.component';

@Component({
  selector: 'kkl-table-create-button',
  templateUrl: './table-create-button.component.html',
  styleUrls: ['./table-create-button.component.scss']
})
export class TableCreateButtonComponent implements OnInit {

  @Input() label : string
  @Input() event : TableEvent

  @Output() createEvent : EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onCreate(): void {
    this.createEvent.emit()
  }

}
