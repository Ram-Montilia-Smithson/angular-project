import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-odd',
  template: '<p>Odd: {{odd}}</p>',
  styles: ['p {color: orange}']
})
export class OddComponent {
  @Input() odd: number
}
