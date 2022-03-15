import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavbarBottomService } from './navbar-bottom.service';
import { CardStepModel } from '../cards/card-step/card-step.model';
import { RouterService } from '../../services/route.service';
import { StepperLayoutService } from '../../screens/stepper-layout/stepper-layout.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { merge, Observable, of } from 'rxjs';

@Component({
  selector: 'kkl-navbar-bottom',
  templateUrl: './navbar-bottom.component.html',
  styleUrls: ['./navbar-bottom.component.scss'],
})
export class NavbarBottomComponent implements OnInit {
  @Input() bottomIcon: string = '';
  @Input() text: string = '';
  @Input() hasNext: boolean;
  @Input() hasPrevious: boolean=true;
  @Input() hasSave: boolean;

  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter<CardStepModel>();
  @Output() save = new EventEmitter();

  public showNext$: Observable<boolean>;
  public nextStep$: Observable<void>;
  private changeStep$: Observable<CardStepModel>;
  private steps$: Observable<CardStepModel[]>;

  constructor(
    private navbarBottomService: NavbarBottomService,
    private stepperLayoutService: StepperLayoutService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.steps$ = this.stepperLayoutService.getStepsObs();
    this.nextStep$ = this.navbarBottomService.getNextStepObs();
    this.changeStep$ = this.stepperLayoutService.getChangeStepObs();
    this.showNext$ = this.setShoeNext();
  }

  private setShoeNext(): Observable<boolean> {
    return this.hasNext
      ? merge(this.handleOnNext(), this.onChangeStep(), this.setShowNextStep$())
      : of(false);
  }

  // Event emitter section
  public onPrevious(): void {
    this.previous.emit();
  }

  public onSave(): void {
    this.save.emit();
  }

  private onNextStep(step: CardStepModel) {
    this.next.emit(step);
  }

  public onNext(): void {
    this.navbarBottomService.emitNextStep();
  }

  private findNextStepIndex(
    steps: CardStepModel[],
    currentStep?: CardStepModel
  ): number {
    const currentStepIndex = currentStep
      ? steps.findIndex((item) => item.path === currentStep.path)
      : steps.findIndex((step) => {
          return step.isActive;
        });
    return currentStepIndex + 1;
  }

  private onChangeStep() {
    return this.changeStep$.pipe(
      switchMap((step) => {
        return this.steps$.pipe(
          map((steps) => {
            const nextIndex = this.findNextStepIndex(steps, step);
            return nextIndex === steps.length ? false : true;
          })
        );
      })
    );
  }

  private handleOnNext() {
    return this.nextStep$.pipe(
      switchMap(() => {
        return this.steps$.pipe(
          map((steps) => {
            const nextIndex = this.findNextStepIndex(steps);
            this.onNextStep(steps[nextIndex]);
            return nextIndex + 1 === steps.length ? false : true;
          })
        );
      })
    );
  }

  private setShowNextStep$(): Observable<boolean> {
    return this.stepperLayoutService.getStepsObs().pipe(
      switchMap((steps: CardStepModel[]) => {
        return this.stepperLayoutService.getStepPrefixObs().pipe(
          startWith(this.routerService.getCurrentPath()),
          map((prefix: string) => {
            const index = steps.findIndex((item) => item.path === prefix);
            return !(steps.length === index + 1);
          })
        );
      })
    );
  }
}
