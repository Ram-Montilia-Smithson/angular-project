import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionGroupModel } from '../models/question-group.model';

@Component({
  selector: 'kkl-form-currency',
  templateUrl: './form-currency.component.html',
  styleUrls: ['./form-currency.component.scss'],
})
export class FormCurrencyComponent implements OnInit {
  @Input() public question: QuestionGroupModel;
  @Input() public controls: FormControl[];
  @Input() formGroup: FormGroup;
  @Input() flexLg: number = 18;
  @Input() flexSm: number = 30;
  @Input() flexXs:number = 35;

  public controlKeys: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.controlKeys = Object.keys(this.formGroup.controls);
  }
}
