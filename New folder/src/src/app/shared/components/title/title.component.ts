import { Component, Input } from '@angular/core';

@Component({
  selector: 'kkl-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  @Input() text: string;
  @Input() slots: {};

  constructor() {}
}
