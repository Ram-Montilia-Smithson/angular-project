import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, ignoreElements, map, Observable, of, startWith, switchMap } from 'rxjs';
import { COLLECT_CONTEST_HEADER } from 'src/app/mock_data/collect-contest-data';
import { COMMENT } from 'src/app/mock_data/collect-seeds-data';
import { CardStepModel } from 'src/app/shared/components/cards/card-step/card-step.model';
import { PageHeaderModel } from 'src/app/shared/components/page-header/page-header,model';
import { PageHeaderService } from 'src/app/shared/components/page-header/page-header.service';
import { MODULE_PREFIX } from 'src/app/shared/constants/module-prefix';
import { StepperLayoutService } from 'src/app/shared/screens/stepper-layout/stepper-layout.service';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';
import { RouterService } from 'src/app/shared/services/route.service';
import { ContestService } from '../collect-contest-table/contest.service';
import { ContestStepperService } from './contest-stepper.service';

@Component({
  selector: 'app-contest-stepper',
  templateUrl: './contest-stepper.component.html',
  styleUrls: ['./contest-stepper.component.scss'],
})
export class ContestStepperComponent implements OnInit {

  checkMobile : boolean = false;
  openPopUp: boolean;
  public portion$: Observable<number>;
  public drawerSize$: Observable<number>;
  public endDrawerOpen: boolean = false;
  private routePrefix: string;
  public headerItems: PageHeaderModel[];
  public comment: string;

  //drawer sizes
  public openDrawer: number;
  public closedDrawer: number;
  collectSeedsGlobalId: any[]=[];

  constructor(
    private contestStepperService: ContestStepperService,
    private breakpointsService: BreakpointService,
    private routerService: RouterService,
    private stepperLayoutService: StepperLayoutService,
    private pageHeaderService: PageHeaderService,
    private contestService:ContestService,
    @Inject(MODULE_PREFIX) public modulePrefix: string
  ) { }

  ngOnInit(): void {
    this.collectSeedsGlobalId.push(this.contestService.rowThatChooseInTable.item.globalID)
    this.contestService.GetSubTenderDetail(this.contestService.rowThatChooseInTable.item.globalID).subscribe(x=>{

    this.headerItems = COLLECT_CONTEST_HEADER;
    this.headerItems[0].text=x[0].subTenderID + ',' + x[0].stDistrictName + ','+ x[0].stRegionName;
    this.headerItems[1].text=x[0].stAreaDunam + " דונם"
    this.headerItems[2].text=x[0].subTenderYear
    this.headerItems[3].text=x[0].stStageStatus.stStageStatus
    this.comment = COMMENT;
    this.pageHeaderService.emitHeaderItems(this.headerItems);
    this.pageHeaderService.emitComment(this.comment);
    this.routePrefix = `${this.modulePrefix}/stepper`;
    this.routerService.emitModulePrefix(this.routePrefix);
    this.stepperLayoutService.setSteps(this.contestStepperService.getSteps());
    this.portion$ = this.combinedBreakPoints();
    this.stepperLayoutService.emitDisplayDrawer(false);
    this.stepNavigate('details');
    this.onResize();
  }
    )}

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.innerWidth <= 768) {
      this.checkMobile = true;
    } else {
      this.checkMobile = false;
    }
  }


  combinedBreakPoints() {
    return combineLatest([
      this.breakpointsService.isSmall(),
      this.breakpointsService.isMobile(),
    ]).pipe(
      switchMap((array: boolean[]) => {
        if (array.includes(true)) {
          this.openDrawer = 1;
          this.closedDrawer = 99;
        } else {
          this.openDrawer = 45;
          this.closedDrawer = 10;
        }
        this.stepperLayoutService.emitDrawerSizeChanged(this.openDrawer);

        return this.stepperLayoutService.getStepPrefixObs().pipe(
          startWith(this.routerService.getCurrentPath()),
          map((prefix: string) => {
            return 100 - this.openDrawer;
          })
        );
      })
    );
  }

  private stepNavigate(path: string) {
    path = `${this.routePrefix}/${path}`;
    this.routerService.navigate(path);
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

  //-----------------------------------------------------

  // navigate from stepper
  public onChangeStep(step: CardStepModel) {
    this.stepNavigate(step.path);
  }

  // navigate from select - mobile
  public onSelectStep(control: FormControl) {
    this.stepNavigate(control.value);
  }

  // navigate from bottom-navbar - next
  public onNext(step: CardStepModel) {
    this.stepNavigate(step.path);
  }

  public onPrevious(): void {
    this.routerService.goBack();
  }

  navigate(url: string) { }

  //---------------------------------------------------------

  listRouter(l) {
    console.log(l);
  }

  list = [
    {
      subject: 'מפות',
      url: '',
    },
    {
      subject: 'הנחיות קבלן',
      url: '',
    },
    {
      subject: 'ריכוז היקפי עבודה',
      url: '',
    },
    {
      subject: 'הצעת מחיר',
      url: '',
    },
  ];
}