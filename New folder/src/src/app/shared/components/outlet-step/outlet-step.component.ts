import { Component, Inject, OnInit } from '@angular/core';
import { STEP_PREFIX } from '../../constants/step-prefix';
import { StepperLayoutService } from '../../screens/stepper-layout/stepper-layout.service';

@Component({
  selector: 'kkl-outlet-step',
  templateUrl: './outlet-step.component.html',
})
export class OutletStepComponent implements OnInit {
  constructor(
    @Inject(STEP_PREFIX) public stepPrefix: string,
    private stepperLayoutService: StepperLayoutService
  ) {}

  ngOnInit(): void {
    this.stepperLayoutService.emitStepPrefix(this.stepPrefix);
  }
}
 