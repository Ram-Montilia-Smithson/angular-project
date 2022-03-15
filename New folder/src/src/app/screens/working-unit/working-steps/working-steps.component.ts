import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-working-steps',
  templateUrl: './working-steps.component.html',
  styleUrls: ['./working-steps.component.scss'],
})
export class WorkingStepsComponent implements OnInit {
  @Input() activeStep = 0;
  @Input() steps: [] ;
  public stepsArray=[]
  @Output() changeActiveStep = new EventEmitter();

  public chosenStep = 0;

  public chooseStep(index) {
    this.chosenStep = +index;
  }

  constructor() {}

  ngOnInit(): void {

    this.stepsArray=this.steps
  }
  setActiveStep(number) {
    this.changeActiveStep.emit(number);
  }
}
