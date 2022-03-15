import { Component, Input, OnInit } from '@angular/core';
import { Color, palette, Palette } from 'src/styles/theme';
import { IconType } from './icon.model';
import { IconsService } from './icons.service';

@Component({
  selector: 'kkl-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  public palette: Color = palette;

  @Input() public key: string;
  @Input() public type: IconType;
  @Input() public size: number;

  @Input() public formType: string = 'form';

  @Input() public color: Palette;
  @Input() public stroke: Palette;

  @Input() public backgroundColor: Palette;

  public scale: string;

  constructor(private iconsService: IconsService) {}

  ngOnInit(): void {
    this.setIcon();
    this.setSize();
    this.color = this.color || 'default';
  }

  private setIcon() {
    const isSvg = this.iconsService.setIcon(this.key);
    if (this.type) {
      this.type = this.type;
    } else {
      this.type = isSvg ? 'svg' : 'mat';
    }
  }

  private setSize() {
    switch (this.formType) {
      case 'table':
        this.size = 1.1;
        break;

      default:
        this.size = this.size || 2.4;
        break;
    }
  }
}
