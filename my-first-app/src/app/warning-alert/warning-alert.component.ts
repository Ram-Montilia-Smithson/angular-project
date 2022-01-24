// בדוגמא פה, אני מוסיף את ההטמל ישירות לקומפוננט
// אותו דבר נכון גם לגבי הססס

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  template: '<h1 class="bg-danger">Warning!!!!!</h1>',
  styles: [
    `
      h1 {
        color: red;
        padding: 20px;
        border: 1px solid red;
        border-radius: 10px
      }
    `,
  ],
})
export class WarningAlertComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
