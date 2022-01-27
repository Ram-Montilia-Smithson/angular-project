import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  template: '<p>Even: {{even}}</p>',
  styles: ['p {color: blue}']
})
export class EvenComponent {
  @Input() even: number
}
