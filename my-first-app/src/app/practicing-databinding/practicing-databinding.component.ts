import { Component } from '@angular/core';

@Component({
  selector: 'app-practicing-dataBinding',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <input type="text" class="form-control" [(ngModel)]="username"/>
        <h1>{{username}}</h1>
        <button class="btn btn-primary" [disabled]="username === ''" (click)="username = ''">Reset User</button>
      </div>
    </div>
  </div>
  `
})
export class PracticingDataBindingComponent {
  username = ""
}
