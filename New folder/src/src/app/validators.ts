import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";

export class FormValidators{

static onlyDigit: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
        if (!FormValidators.hasValue(control)) {
          return null;
        }
        return /^[1-9]\d*$/.test(control.value) ? null : {onlyDigit: true };
      }
    static onlyLetters: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
          if (!FormValidators.hasValue(control)) {
            return null;
          }
          return /^[a-zA-Z \u0590-\u05fe ,.'-]+$/i.test(control.value) ? null : {onlyLetters: true };
        }
      static hasValue(control: AbstractControl): boolean {
        const value = control.value;
        if (value === undefined || value === null) {
          return false;
        }
        return value !== '' ? true : false;
      }
    }; 