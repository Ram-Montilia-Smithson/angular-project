import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidators } from 'src/app/validators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  EntranceToAPersonalAreaForm:FormGroup;
  @Output() nextStep = new EventEmitter()

  public userType= 'worker'
  public firstLoad =true
  constructor(private route:Router , private fb:FormBuilder) { }

  ngOnInit(): void {
    this.EntranceToAPersonalAreaForm = this.fb.group({ 'UserName': [''], 'Password': ['']});
  }

  public setUserType(userType){
    this.userType=userType
    this.firstLoad =false
  }
  dataVerificationCheck(){
    this.EntranceToAPersonalAreaForm.get('UserName').setValidators([Validators.required,FormValidators.onlyLetters]);
    this.EntranceToAPersonalAreaForm.get('UserName').updateValueAndValidity();
    if(this.userType=='worker'){
    this.EntranceToAPersonalAreaForm.get('Password').setValidators(Validators.required);
    this.EntranceToAPersonalAreaForm.get('Password').updateValueAndValidity();
    }
    if (this.validateForm(this.EntranceToAPersonalAreaForm)) {
    //בדיקת נתונים מול השרת....
 //this.route.navigate(['/dilol-yarot'])
    this.route.navigate(['/forestry/dashboard'])
  }
}
  validateForm(form: any) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsDirty({ onlySelf: true });
      if (control instanceof FormGroup) {
        this.validateForm(control);
      }
    });
    form.updateValueAndValidity({
      onlySelf: false,
      emitEvent: true
    });
    return form.valid;
}
public proceed(){
  
  this.nextStep.emit();
}
}
