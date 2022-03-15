import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { BreakpointService } from '../../services/breakpoint.service';
import {
  CardStepModel,
  StepperDirection,
} from '../cards/card-step/card-step.model';
import { QuestionSelectModel } from '../form/models/question-select.model';
import { FormService, Question } from '../form/services/form.service';
// import { FormOption } from '../form/form-input/form-input.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kkl-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @Input() question$: Observable<Question>;
  @Input() steps$: Observable<CardStepModel[]>;
  @Input() direction: StepperDirection;
  @Input() stepRef: ElementRef;

  public mobile$: Observable<boolean>;
  public selectQuestion$: Observable<Question>;

  @Output() changeStep = new EventEmitter<CardStepModel>();
  @Output() selectStep = new EventEmitter<FormControl>();

  constructor(
    private breakpointService: BreakpointService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.mobile$ = this.breakpointService.isMobile();
    if (this.question$) {
      this.selectQuestion$ = this.setInputSelect();
    }
  }

  private setInputSelect(): Observable<Question> {
    return this.question$.pipe(
      map((question) => {
        const select = this.formService.setQuestion(question);
        const control = this.formService.getFieldControl(question);

        if (select instanceof QuestionSelectModel) {
          select.control = control;
        }
        return select;
      })
    );
  }

  public onChangeStep(step: CardStepModel) {
    this.changeStep.emit(step);
  }
  // public onSelectStep(option: FormOption) {
    // const { control } = option;
    // this.selectStep.emit(control);
  // }
}
