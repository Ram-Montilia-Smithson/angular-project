import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'kkl-expand-panel',
  templateUrl: './expand-panel.component.html',
  styleUrls: ['./expand-panel.component.scss'],
})
export class ExpandPanelComponent implements OnInit {
  // prop for custom class
  @Input() public variant: string;
  @Input() public hideToggle: boolean;
  @Input() public hideHeader: boolean;
  @Input() public disabled: boolean;

  @Input() public expanded: boolean;

  public panelOpenState = false;

  @Output() expand: EventEmitter<void> = new EventEmitter();
  @Output() closed: EventEmitter<void> = new EventEmitter();
  @Output() opened: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.variant = this.variant || '';
    this.expanded = this.expanded || false;
    this.hideToggle = this.hideToggle || false;
    this.hideHeader = this.hideHeader || false;
  }

  public onPanelExpend() {
    this.expand.emit();
  }

  public onPanelClosed() {
    this.panelOpenState = false
    this.closed.emit();
  }

  public onPanelOpen() {
    this.panelOpenState = true
    this.opened.emit();
  }
}
