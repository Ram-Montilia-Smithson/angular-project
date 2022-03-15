import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CardDashboardModel } from './card-dashboard.model';
import { Subscription } from 'rxjs';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';

@Component({
  selector: 'kkl-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss'],
})
export class CardDashboardComponent implements OnInit, OnDestroy {

  @Input() card: CardDashboardModel;
  @Output() click = new EventEmitter<CardDashboardModel>();

  private subscription: Subscription;
  constructor(private breakpointService: BreakpointService) {}

  ngOnInit(): void {
    this.subscribeToMobile();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onCardClick() {
  }

  private subscribeToMobile() {
    this.subscription = this.breakpointService
      .isMobile()
      .subscribe((md: boolean) => {
        this.card.size = md ? 4 : 6;
      });
  }
}
