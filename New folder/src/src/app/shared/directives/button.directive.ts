import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {


  @HostBinding('style.cursor') private cursor: string;

  constructor() { }

  ngOnInit(): void {
    this.cursor = 'pointer'
  }

}
