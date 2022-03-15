import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { QuestionRadioModel } from '../models/question-radio.model';


@Component({
  selector: 'kkl-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss']
})
export class FormRadioComponent implements OnInit {

  @Input() public question: QuestionRadioModel
  @Input() public control: FormControl
  @Output() public change = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  public handleChange(radio: MatRadioChange) {
    this.control.setValue(radio.value);
    this.change.emit({key:this.question.key,value:radio.value});
  }
}
