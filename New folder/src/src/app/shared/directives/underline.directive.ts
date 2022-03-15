import { Directive, HostBinding, Input } from '@angular/core';
import { Palette, palette } from 'src/styles/theme';

@Directive({
  selector: '[appUnderline]',
})
export class UnderlineDirective {
  private palette = palette;

  @Input() color: Palette;
  @Input() thick: number;
  @Input() pattern: 'solid' | 'dotted';

  @HostBinding('style.border-bottom') private underline: string;

  constructor() {}

  ngOnInit(): void {
    this.underline = `${this.thick || 1}px ${this.pattern || 'solid'} ${this.palette[this.color || 'primary']}`;
  }
}
