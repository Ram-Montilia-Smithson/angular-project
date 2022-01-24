import { Component } from '@angular/core';

@Component({
  selector: 'app-practicing-databinding',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <hr>

        <input
        type="text"
        class="form-control"
        [(ngModel)]="username"/>

        <p>{{username}}</p>

        <button
        class="btn btn-primary"
        [disabled]="username === ''"
        (click)="username = ''">Reset User</button>
      </div>
    </div>
  </div>
  `
})
export class PracticingDatabindingComponent {
  username = ""
}
