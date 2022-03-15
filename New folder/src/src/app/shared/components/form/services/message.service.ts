import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  // handle input error messages
  public getErrorMessage(control: FormControl, placeHolder: string): string {

    if (control.hasError('required')) {
      return 'שדה חובה ';
    }

    if (control.hasError('minlength')) {
      return 'ערך קצר מידי ';
    }

    if (control.hasError('pattern')) {
      return `invalid ${placeHolder} format`;
    }

    return '';
  }


}
