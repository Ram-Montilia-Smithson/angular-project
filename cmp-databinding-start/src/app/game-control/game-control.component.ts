import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  template: `
    <button class="btn btn-success" (click)="start()">Start</button>
    <button class="btn btn-danger" (click)="stop()">Stop</button>
  `
})
export class GameControlComponent {

  @Output() everySecond = new EventEmitter<number>();
  number: number = 1
  interval: any

  start(){
    this.interval = setInterval(() => {
      this.everySecond.emit(this.number)
      this.number ++
    }, 1000);
  }

  stop(){
    clearInterval(this.interval);
  }

}
