import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';
import { CardStepModel } from './card-step.model';

@Component({
  selector: 'kkl-card-step',
  templateUrl: './card-step.component.html',
  styleUrls: ['./card-step.component.scss'],
})
export class CardStepComponent implements OnInit {
  @Input() public step: CardStepModel;

  public active$: Observable<boolean>;

  public mobile$: Observable<boolean>;

  @Output() changeStep: EventEmitter<CardStepModel> = new EventEmitter();

  constructor(private breakpointService: BreakpointService) {}

  ngOnInit(): void {
    this.active$ = this.step.getActiveObs();
    this.mobile$ = this.breakpointService.isMobile()
  }

  public onStepClick(): void {
    if (!this.step.isActive) {
      this.changeStep.emit(this.step);
    }
  }
}
