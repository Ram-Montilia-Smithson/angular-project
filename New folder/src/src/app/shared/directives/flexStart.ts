import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appFlexStart]'
})
export class FlexStartDirective {

  @HostBinding('style.display') private display: string;
  @HostBinding('style.justify-content') private justify: string;

  constructor() {}

  ngOnInit(): void {
    this.display = 'flex'
    this.justify = 'start'
  }
}
