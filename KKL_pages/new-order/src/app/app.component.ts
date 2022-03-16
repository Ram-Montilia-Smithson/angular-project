import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CardDashboardModel, CardStepModel, IconModel, NavbarService, RouterService, StepperLayoutService } from '@ComraxLTD/kakal-ui';
import { StatusBarsModel } from '@ComraxLTD/kakal-ui/lib/status-bars/status-bars.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public logos!: IconModel[];
  public control:FormControl = new FormControl();
  public endDrawerOpen: boolean = false;
  public openDrawer!: number;
  public portion$!: Observable<number>;
  public closedDrawer!: number;
  public drawerSize$!: Observable<number>;
  public showSave$!: Observable<boolean>;

  status: StatusBarsModel = {
    label: 'ממתין לשקילה',
    authorizedBars: 2,
    totalBars: 6,
  };

  constructor(
    private navbarService: NavbarService,
    private routerService: RouterService,
    private stepperLayoutService: StepperLayoutService
    ) { }

  ngOnInit(): void {

    //set icon on left side
    this.logos = [{
      key: "logo",
      size: 7,
      path: "small-contracts"
    }]
  }

  cards: CardDashboardModel[] = [
    new CardDashboardModel({
      label: 'Stepper - layout',
      svgUrl: 'group',
      path: 'stepper-layout',
      size: 2.5,
    }),
    new CardDashboardModel({
      label: 'הליכים קיימים',
      svgUrl: 'connect',
      path: 'existing-procedures',
      size: 2.5,
    }),
    new CardDashboardModel({
      label: 'בדיקת ספקים',
      svgUrl: 'evaluation',
      path: 'supplier-check',
      size: 2.5,
    }),
    new CardDashboardModel({
      label: 'דוחות',
      svgUrl: 'reports',
      path: 'reports',
      size: 2.5,
    }),
  ];

  public onCardClick(path: string) {
    const url: string = `layout/${path}`;
    this.routerService.navigate(url);
  }

  onEndDrawerEmitted() {
    let portion: number = 0;
    this.endDrawerOpen = !this.endDrawerOpen;
    if (!this.endDrawerOpen) {
      this.stepperLayoutService.emitDrawerSizeChanged(this.openDrawer);
      portion = 100 - this.openDrawer;
      this.portion$ = of(portion);
    } else {
      this.stepperLayoutService.emitDrawerSizeChanged(this.closedDrawer);
      portion = 100 - this.closedDrawer;
      this.portion$ = of(portion);
    }
  }

  private navigate(path: string) {
    path = `/${path}`;
    this.routerService.navigate(path);
  }

  public onChangeStep(step: CardStepModel) {
    this.navigate(step.path!);
  }

  public onNext(step: CardStepModel) {
    this.navigate(step.path!);
  }

  public onPrevious(): void {
    this.routerService.goBack();
  }

}
