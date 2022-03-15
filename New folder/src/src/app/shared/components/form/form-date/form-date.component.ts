import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'kkl-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'he-HE' },
  ],
})
export class FormDateComponent implements OnInit {
  @Input() public placeHolder: string;
  @Input() public control: FormControl;
  @Input() public range: boolean;
  @Input() public clearRangeForm;

  @Output() public dateEvent: EventEmitter<MatDatepickerInputEvent<Date>> =
    new EventEmitter();
  @Output() start: EventEmitter<MatDatepickerInputEvent<Date>> =
    new EventEmitter();
  @Output() end: EventEmitter<MatDatepickerInputEvent<Date>> =
    new EventEmitter();

  @Output() rangeFormEmit: EventEmitter<any> = new EventEmitter();
  rangeForm = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public controlKeys: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.control = this.control || new FormControl();
    this.rangeFormEmit.emit(this.rangeForm);
  }

  public dateChange(event: MatDatepickerInputEvent<Date>): void {
    this.dateEvent.emit(event.value['_d']);
    this.control.setValue(event.value['_d']);
  }

  rangeDateChange(event: MatDatepickerInputEvent<Date>, type: string) {
    if (event.value) {
      if (type === 'start') {
        this.start.emit(event.value['_d']);
      } else {
        this.end.emit(event.value['_d']);
      }
    }
  }
}
