import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListModel<T> {

  constructor(
    public items : T[]
  ) {}
}
