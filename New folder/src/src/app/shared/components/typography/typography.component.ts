import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color, palette, Palette } from 'src/styles/theme';

@Component({
  selector: 'kkl-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
})
export class TypographyComponent implements OnInit {

  public palette: Color = palette;
  @Input() public size: number;
  @Input() public bold: number;
  @Input() public padding: number;
  @Input() public color: Palette;
  @Input() public bgColor: Palette;
  @Input() public width: string;
  @Input() public disabled: boolean

  
  @Output() click: EventEmitter<void> = new EventEmitter()
  constructor(
  ) { }

  ngOnInit(): void {
    this.size = this.size || 1.4;
    this.bold = this.bold || 500;
    this.color = this.color || 'text';
    this.width = this.width || 'auto';
  }


  public onClick() {
    this.click.emit()
  }
}
