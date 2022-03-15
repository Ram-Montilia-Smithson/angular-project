import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-search',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild('f') signupForm:NgForm
  constructor() { } 


  public inputFields=[{
    name:"שנת תוכנית עבודה",
    options:[{
      label:'option-1',
      option:'אופציה 1'
    },{
      label:'option-2',
      option:'אופציה 2'
    },{
      label:'option-3',
      option:'אופציה 3'
    }]
  
  },
  {
    name:"סטטוס",
    options:[{
      label:'option-1',
      option:'אופציה 1'
    },{
      label:'option-2',
      option:'אופציה 2'
    },{
      label:'option-3',
      option:'אופציה 3'
    }]
  },
  {
    name:"מרחב",
    options:[{
      label:'option-1',
      option:'אופציה 1'
    },{
      label:'option-2',
      option:'אופציה 2'
    },{
      label:'option-3',
      option:'אופציה 3'
    }]
  },
  {
    name:"אזור",
    options:[{
      label:'option-1',
      option:'אופציה 1'
    },{
      label:'option-2',
      option:'אופציה 2'
    },{
      label:'option-3',
      option:'אופציה 3'
    }]
  },
  {
    name:"יער",
    options:[{
      label:'option-1',
      option:'אופציה 1'
    },{
      label:'option-2',
      option:'אופציה 2'
    },{
      label:'option-3',
      option:'אופציה 3'
    }]
  }]

  public value =''
 

  ngOnInit(): void {
  }

}
