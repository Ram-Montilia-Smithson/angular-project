import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardLayoutService } from 'src/app/services/dashboard-layout.service';
import { CardDashboardModel } from 'src/app/shared/components/cards/card-dashboard/card-dashboard.model';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';
import { RouterService } from 'src/app/shared/services/route.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public dashboardArray = [
    {
      svgUrl: 'assets/images/logs.svg',
      name: 'תוכניות ייצור',
      url: 'forestry/production-process',
   
    },
    {
      svgUrl: 'assets/images/logs.svg',
      name: 'יחידות עבודה',
      url: 'dilol-yarot',
    },
  ];
  public cards: CardDashboardModel[];
  public md$: Observable<boolean>;

  constructor(
    private dashboardLayoutService: DashboardLayoutService,
    private routerService: RouterService,
    private breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {
    this.cards = this.dashboardLayoutService.getCards();
    this.md$ = this.breakpointService.isMedium();
    console.log(this.cards);
  }

  public cardCliked(url: string) {
    sessionStorage.clear();
    console.log(url); 
    this.routerService.navigate(url)
  } 
}
