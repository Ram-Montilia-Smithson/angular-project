import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, of, startWith, switchMap } from 'rxjs';
import {
  COLLECT_SEEDS_HEADER,
  COMMENT,
} from 'src/app/mock_data/collect-seeds-data';
import { CardStepModel } from 'src/app/shared/components/cards/card-step/card-step.model';
import { PageHeaderModel } from 'src/app/shared/components/page-header/page-header,model';
import { PageHeaderService } from 'src/app/shared/components/page-header/page-header.service';
import { MODULE_PREFIX } from 'src/app/shared/constants/module-prefix';
import { StepperLayoutService } from 'src/app/shared/screens/stepper-layout/stepper-layout.service';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';
import { RouterService } from 'src/app/shared/services/route.service';
import { CollectSeedsService } from '../collect-seeds-table/collect-seeds.service';
import { CollectSeedOrderService } from './collect-seed-order.sevice';

@Component({
  selector: 'app-collect-seed-order',
  templateUrl: './collect-seed-order.component.html',
  styleUrls: ['./collect-seed-order.component.scss'],
})
export class CollectSeedOrderComponent implements OnInit {
  public portion$: Observable<number>;
  public listofGlobalID=[];
  public drawerSize$: Observable<number>;
  public endDrawerOpen: boolean = false;
  private routePrefix: string;
  public headerItems: PageHeaderModel[];
  public comment: string;

  //drawer sizes
  public openDrawer: number;
  public closedDrawer: number;

  constructor(
    private seedsService:CollectSeedsService,
    private collectSeedOrderService: CollectSeedOrderService,
    private breakpointsService: BreakpointService,
    private routerService: RouterService,
    private stepperLayoutService: StepperLayoutService,
    private pageHeaderService: PageHeaderService,
    private collectSeedsService:CollectSeedsService,
    @Inject(MODULE_PREFIX) public modulePrefix: string
  ) {}

  ngOnInit(): void {
     
  this.headerItems = COLLECT_SEEDS_HEADER;
  this.headerItems[0].text=this.collectSeedsService.rowThatChooseTable.plantName
  this.headerItems[1].text=this.collectSeedsService.rowThatChooseTable.site
  this.headerItems[2].text=this.collectSeedsService.rowThatChooseTable.lastPic
  this.headerItems[3].text=this.collectSeedsService.rowThatChooseTable.status.statusName
    this.listofGlobalID.push(this.collectSeedsService.rowThatChooseTable.globalID_2);
  this.comment = COMMENT;
  this.pageHeaderService.emitHeaderItems(this.headerItems);
  this.pageHeaderService.emitComment(this.comment);
  this.routePrefix = `${this.modulePrefix}/order`;
  
  this.routerService.emitModulePrefix(this.routePrefix);
  this.stepperLayoutService.setSteps(this.collectSeedOrderService.getSteps());
  // this.portion$ = this.setPortion$();
 
  this.stepperLayoutService.emitDisplayDrawer(false);
  this.stepNavigate('details');
    this.portion$ = this.combinedBreakPoints();
    


   
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
    console.log('----' +this.closedDrawer);
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

  // private setPortion$() {
  //   return this.breakpointsService.isMobile().pipe(
  //     switchMap((mobile: boolean) => {
  //       if (mobile) {
  //         this.openDrawer = 99;
  //         this.closedDrawer = 1;
  //       } else {
  //         this.openDrawer = 45;
  //         this.closedDrawer = 10;
  //       }

  //       return this.stepperLayoutService.getStepPrefixObs().pipe(
  //         startWith(this.routerService.getCurrentPath()),
  //         map((prefix: string) => {
  //           return 100 - this.openDrawer;
  //         })
  //       );
  //     })
  //   );
  // }

  // private setDraweSize$() {
  //   return of(20);
  // }

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

  // EVENT SECTION

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

  navigate() {
       
      const link="https://experience.arcgis.com/experience/19dca33e29e145338ec8ce66c269afc4?data_id=dataSource_1-17c7d3d5afb-layer-6%3A";
      const url=`${link+this.collectSeedsService.rowThatChooseTable.objectid+ "&locale=he"}`
      window.open(url);
    
}
donlowedSticker(){
  
}
}
