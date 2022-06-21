import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {

  counter: number = 0

  counterUpdated = new EventEmitter<number>();

  incrementCounter() {
    this.counter++
    this.counterUpdated.emit(this.counter)
  }

  constructor() { }
}
