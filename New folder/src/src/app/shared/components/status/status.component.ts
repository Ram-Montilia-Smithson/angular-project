import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatusModel } from './status.model';

@Component({
  selector: 'kkl-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {

  @Input() public cols: number
  @Input() public height: number
  @Input() public gutter: number
  @Input() public color: string;
  @Input() public hasLabel: boolean
  @Input() public status: StatusModel;

  @Input() labelRef: ElementRef

  @Output() click : EventEmitter<void>  = new EventEmitter()

  public steps: number[] = [];

  constructor() { }

  ngOnInit(): void {

    this.cols = this.cols || 8
    this.color = this.color || 'accent';

    for (let i = 1; i <= this.status.status; i++) {
      this.steps.push(100);
    }
    for (let i = [...this.steps].length; i < this.cols; i++) {
      this.steps.push(0);
    }

  }

}
