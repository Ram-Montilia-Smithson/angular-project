import { Component } from '@angular/core';

@Component({
  selector: 'app-practicing-directives',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <button
        class="btn btn-primary"
        (click)="onToggleDisplay()">
        Dispaly Details</button>

        <h1 *ngIf="secretShow">Secret Password = tuna</h1>

        <h6
        *ngFor="let click of clicks; let i = index"
        [ngStyle]="{backgroundColor: i >= 4 ? 'blue' : 'transparent'}"
        [ngClass]="{'white-text': i >= 4}">{{click}}</h6>
      </div>
    </div>
  </div>
  `,
  styles: ['.white-text{color: white}']
})
export class PracticingDirectivesComponent {

  secretShow = false
  clicks = []

  onToggleDisplay() {
    this.secretShow = !this.secretShow
    this.clicks.push(`${new Date()} ${this.secretShow ? 'hide' : 'show'}`)
  }
}
