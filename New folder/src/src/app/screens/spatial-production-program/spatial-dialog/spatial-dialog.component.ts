import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-spatial-dialog',
  templateUrl: './spatial-dialog.component.html',
  styleUrls: ['./spatial-dialog.component.scss']
})
export class SpatialDialogComponent implements OnInit {
  @Output() doDelete: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public updateDeleteState(value:boolean):void {
    this.doDelete.emit(value);
  }
}
