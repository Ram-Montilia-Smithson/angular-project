import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';
import { CardDashboardModel } from '../cards/card-dashboard/card-dashboard.model';

@Component({
  selector: 'kkl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class KKLDashboardComponent implements OnInit {

  @Input() public prefix: string;
  @Input() public cols: number;
  @Input() public rows: number;
  @Input() public moduleTitle: string;
  @Input() public cards: CardDashboardModel[];

  public md$: Observable<boolean>;

  @Output() cardClick: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private breakpointService: BreakpointService,
  ) { }

  ngOnInit(): void {
    this.md$ = this.breakpointService.isMobile();
    this.cols = this.cols ||  this.cards.length /2
    this.rows = this.rows || 2
  }

  public onCardClick(card) {
    this.cardClick.emit(card.path)
  }
}
