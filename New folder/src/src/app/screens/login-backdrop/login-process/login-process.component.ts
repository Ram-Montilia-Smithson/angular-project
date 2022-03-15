import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-process',
  templateUrl: './login-process.component.html',
  styleUrls: ['./login-process.component.scss']
})
export class LoginProcessComponent implements OnInit {

  public userType= 'worker'
  public firstLoad =true
  public otp= false
  constructor() { }

  ngOnInit(): void {
  }

  public setUserType(userType){
    this.userType=userType
    this.firstLoad =false
  }

  public proceedToOtp(){
    this.otp=true
  }
}
