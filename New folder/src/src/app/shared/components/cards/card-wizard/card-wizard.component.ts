import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CardStepModel, StepType } from '../card-step/card-step.model';

@Component({
  selector: 'kkl-card-wizard',
  templateUrl: './card-wizard.component.html',
  styleUrls: ['./card-wizard.component.scss']
})
export class CardWizardComponent implements OnInit {
  @Input() public step: CardStepModel;

  public type: StepType;
  public active$: Observable<boolean>;


  @Output() changeStep: EventEmitter<CardStepModel> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.type = this.step.type;
    this.active$ = this.step.getActiveObs();
  }

  public onStepClick(): void {
    if (!this.step.isActive) {
      this.changeStep.emit(this.step);
    }
  }


}
