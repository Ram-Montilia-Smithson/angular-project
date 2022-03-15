import {
  Directive,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  CardStepModel,
  StepType,
} from '../components/cards/card-step/card-step.model';
import { BreakpointService } from '../services/breakpoint.service';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';

@Directive({
  selector: '[appSize]',
})
export class SizeDirective implements OnInit, OnDestroy {
  @Input() step: CardStepModel;
  @Input() size: number;
  @Input() type: StepType;
  @Input() divider: number;
  @Input() space: number;

  private mobile$: Observable<boolean>;

  private subscription: Subscription;

  @HostBinding('style.height') public height: string;
  @HostBinding('style.width') public width: string;

  private stepHeight: number;

  constructor(private breakpointService: BreakpointService) {}

  ngOnInit(): void {
    this.setSize();
    this.mobile$ = this.breakpointService.isMobile();
    this.subscribeToBreakpoint();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setSize() {
    switch (this.type) {
      case 'wizard':
        this.width = '6.8rem';
        this.height = '9rem';
        break;
      case 'status':
        break;
      case 'step':
        this.width = `${this.size}rem`;
        this.height = `${this.stepHeight}rem`;
        break;
      default:
        this.width = `${this.size * (this.divider || 1)}rem`;
        this.height = `${this.size}rem`;
    }
  }

  private subscribeToBreakpoint() {
    this.subscription = this.mobile$
      .pipe(
        switchMap((mobile: boolean) => {
          this.stepHeight = mobile ? 6 : 12;
          if (this.step) {
            return this.step.getActiveObs().pipe(
              map((active: boolean) => {
                if (mobile && this.type === 'step') {
                  this.size = active ? 2.5 : 1.6;
                }
                this.setSize();
              })
            );
          }

          return of(true);
        })
      )
      .subscribe();
  }
}
