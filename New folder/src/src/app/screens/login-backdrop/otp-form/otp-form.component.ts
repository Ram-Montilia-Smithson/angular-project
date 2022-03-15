import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss']
})
export class OtpFormComponent implements OnInit {

  signupForm: FormGroup
  public phoneNumber = 6957
  public otpArray = new Array(6)
  public prefix ='otp'
  constructor() { }
  
 
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'otp0': new FormControl(''),
      'otp1': new FormControl(''),
      'otp2': new FormControl(''),
      'otp3': new FormControl(''),
      'otp4': new FormControl(''),
      'otp5': new FormControl(''),
    })
  }

  onSubmit(){}

  keytab(event){
    let element = event.srcElement.nextElementSibling; 

    if(element == null) 
        return;
    else
        element.focus();  
}

}
