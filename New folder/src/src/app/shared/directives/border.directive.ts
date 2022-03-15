import { Directive, HostBinding, Input } from '@angular/core';
import { palette, Palette } from 'src/styles/theme';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective {

  private palette = palette;

  @Input() borderColor: Palette;
  @Input() thick: number;
  @Input() side: string='all';

  @HostBinding('style.border') private border: string;
  @HostBinding('style.border-bottom') private borderBottom: string;

  constructor() {}

  ngOnInit(): void {
    switch (this.side) {
      case 'bottom':
        
        this.borderBottom = `${this.thick || 1}px solid ${this.palette[this.borderColor || 'primary']}`;
        break;
        
        default:
        this.border = `${this.thick || 1}px solid ${this.palette[this.borderColor || 'primary']}`;
        break;
    }
  }
}
