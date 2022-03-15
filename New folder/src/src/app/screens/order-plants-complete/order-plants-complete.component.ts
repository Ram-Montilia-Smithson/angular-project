import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { OrderPlantsCompleteService } from 'src/app/services/order-plants-complete.service';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
// import { FilterModel } from 'src/app/components/filter-Model/filter-model.component';

import {
  regularFormSecondTable,
  regularHeadersSecondTable,
  regularDataSecondTable,
  expandableSecondTableTablesObj,
  expandableSecondTableDataArray,
  expandableSecondTableHeaders,
  expandableTableHeaders,
  expandableTableDataArray,
  expdandableTableTablesObj,
  secondTreeTypes,
  treeTypes,
} from '../../mock_data/order-plantes-complete-data';
import { OrderPlantsCompleteFormComponent } from './order-plants-complete-form/order-plants-complete-form.component';
import { SpatialProductionProgramService } from 'src/app/services/spatial-production-program.service';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AddBeePlanService } from 'src/app/services/add-bee-plan.service';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { NewOrderPlantsCompleteService } from './order-plants-complete.service';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import { NewOrderPlantesCompleteExpandingTableModel } from './new-order-plantes-complete-expanding-table/new-order-plantes-complete-expanding-table.model';
import { NewOrderPlantesCompleteExpandingTableService } from './new-order-plantes-complete-expanding-table/new-order-plantes-complete-expanding-table.service';

@Component({
  selector: 'app-order-plants-complete',
  templateUrl: './order-plants-complete.component.html',
  styleUrls: ['./order-plants-complete.component.scss'],
})
export class OrderPlantsCompleteComponent implements OnInit, OnChanges {
  public showPersonTable$: Observable<boolean>;
  public showShortTable$: Observable<boolean>;
  public filterValue$: Observable<string>;
  sharedData: any;
  IdArray: any = [];
  status: number;
  onatNetia: any;
  isFirstTable: boolean = true;
  title: any;
  public dataSource: TableDataSource<NewOrderPlantesCompleteExpandingTableModel> =
    new TableDataSource();
  changingValue: Subject<boolean> = new Subject();
  expandableTableHeaders: any = [
    { english: 'tzemach', hebrew: 'צמח' },
    { english: 'eshtaol', hebrew: 'אשתאול' },
    { english: 'golani', hebrew: 'גולני' },
    { english: 'gilat', hebrew: 'גילת' },
    { english: 'total', hebrew: 'סה"כ' },
    { english: 'controllers', hebrew: '' },
  ];

  expandableTableDataArray: any = [
    {
      tzemach: 'אקליפטוס המקור',
      eshtaol: '10000',
      golani: '5000',
      gilat: '120',
      total: '15000',
      controllers: true,
    },
  ];
  expdandableTableTablesObj: any = {
    // headers:['משתלה','כמות','לקוח','טלפון','כתובת','דוא"ל'],
    headers: ['דוא"ל', 'כתובת', 'טלפון', 'לקוח', 'כמות', 'משתלה'],

    form: [
      {
        value: '',
        key: 'mashtela',
        required: true,
        controlType: 'text',
        type: 'text',
        options: [
          { key: 'string', value: 'string' },
          { key: 'string1', value: 'string1' },
        ],
      },
      {
        value: '',
        key: 'kamut',
        required: true,
        controlType: 'text',
        type: 'text',
        options: [
          { key: 'string', value: 'string' },
          { key: 'string1', value: 'string1' },
        ],
      },
      {
        value: '',
        key: 'lakoach',
        required: true,
        controlType: 'text',
        type: 'text',
        options: [
          { key: 'string', value: 'string' },
          { key: 'string1', value: 'string1' },
        ],
      },
      {
        value: '',
        key: 'phone',
        required: true,
        controlType: 'text',
        type: 'text',
        options: [
          { key: 'string', value: 'string' },
          { key: 'string1', value: 'string1' },
        ],
      },
      {
        value: '',
        key: 'address',
        required: true,
        controlType: 'text',
        type: 'text',
        options: [
          { key: 'string', value: 'string' },
          { key: 'string1', value: 'string1' },
        ],
      },
      {
        value: '',
        key: 'email',
        required: true,
        controlType: 'text',
        type: 'text',
        options: [
          { key: 'string', value: 'string' },
          { key: 'string1', value: 'string1' },
        ],
      },
    ],
    data: [
      {
        gardening: 'אשתאול',
        amount: '500',
        customer: 'בלום אורנה',
        phone: '054-7894561',
        adress: 'יסוד המעלה 58 דונם',
        email: 'tsurithefer@gmail.com',
        controllers: true,
      },
      {
        gardening: 'אשתאול',
        amount: '500',
        customer: 'בלום אורנה',
        phone: '054-7894561',
        adress: 'יסוד המעלה 58 דונם',
        email: 'tsurithefer@gmail.com',
        controllers: true,
      },
    ],
  };
  regularTableFormArray: any = [
    {
      value: '',
      key: 'lakoach',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
      disabled: true,
    },
    {
      value: '',
      key: 'phone',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
      disabled: true,
    },
    {
      value: '',
      key: 'address',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
      disabled: true,
    },
    {
      value: '',
      key: 'email',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
      disabled: true,
    },
    {
      value: '',
      key: 'minHatzemach',
      required: true,
      controlType: 'text',
      autoComplete: true,
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
      disabled: true,
    },
    {
      value: '',
      key: 'ashtaol',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
    {
      value: '',
      key: 'golani',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
    {
      value: '',
      key: 'gilat',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
    {
      value: '',
      key: 'total',
      required: true,
      controlType: 'text',
      type: 'text',
      disabled: true,
    },
  ];
  regularTableHeaders: any = [
    'לקוח',
    'טלפון',
    'כתובת',
    'דוא"ל',
    'צמח',
    'אשתאול',
    'גולני',
    'גילת',
    'סה"כ',
  ];
  regularTableDataArray: any = [

  ];

  isOpend = true;

  filterValue = 'all';
  public selectedArr: any[] = this.regularTableDataArray;
  public selectedHeaderTable: any[] = this.regularTableHeaders;
  KamutArray: any[] = [];
  misparTochnitArray: any[] = [];
  minHatzemachArray: any[] = [];
  anotherRegularTableFormArray: any;
  IdAshtaol: any[] = [];
  IdGolani: any[] = [];
  IdGilat: any[] = [];
  IdMinAhtzemach: any[] = [];
  IdTotal: any[] = [];
  IdKodMinHatzemach: any[] = [];
  id: any;

  @Input() treeTypes: any[] = [];

  constructor(
    private newOrderPlantsCompleteService: NewOrderPlantsCompleteService,
    private OrderPlantsCompleteService: OrderPlantsCompleteService,
    private AddProductionProcessService: AddProductionProcessService,
    private spatialProductionProgramService: SpatialProductionProgramService,
    private newOrderPlantesCompleteExpandingTableService: NewOrderPlantesCompleteExpandingTableService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private addBeePlanService: AddBeePlanService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  @ViewChild(OrderPlantsCompleteFormComponent)
  child: OrderPlantsCompleteFormComponent;
  ngOnInit(): void {
    this.id = this.AddProductionProcessService.addTochnitYezur.id;
    this.tochnitYitzurYaarMishki(
      this.AddProductionProcessService.addTochnitYezur.id
      );
      this.showPersonTable$ =
      this.newOrderPlantsCompleteService.showShowPrsonTaleAsObs();
    this.showShortTable$ = this.showShortTable()
    this.filterValue$ = this.filterValueObs();
    this.filterValue="all"
  }
  tochnitYitzurYaarMishki(misparTochnit) {
    try {
      if (this.isFirstTable)
        if (this.anotherRegularTableFormArray == null)
          this.anotherRegularTableFormArray = this.regularTableFormArray;
      this.regularTableFormArray = this.anotherRegularTableFormArray;
      this.OrderPlantsCompleteService.getTochnitYitzurYaarMishki(
        misparTochnit,
        0
      ).subscribe(
        (res) => {
         this.newOrderPlantsCompleteService.emitShowShortTable(true)
         this.newOrderPlantsCompleteService.emitfilterValue('all')
          
          this.treeTypes = treeTypes;
          
          this.addBeePlanService.degelOfOrderPlanComplete = true;
          this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot = false;
          this.addBeePlanService.degelofAddBeeComplete = false;
          this.OrderPlantsCompleteService.listofTableOrderPlantsComplete =
            res.mineTzemach;
          this.OrderPlantsCompleteService.treeTypes = this.treeTypes;
          this.treeTypes[0]['count'] = res.machtaniyim;
          this.treeTypes[1]['count'] = res.choreshTivi;
          this.treeTypes[2]['count'] = res.ekaliptus;
          this.treeTypes[3]['count'] = res.shitim;
          this.treeTypes[4]['count'] = res.atzeyNoy;
          this.treeTypes[5]['count'] = res.total;
          this.regularTableDataArray = this.arraySorting(res.mineTzemach);
          //thos for kamut
          this.regularTableDataArray = this.arrayDeleteKamut(
            this.regularTableDataArray
          );
          this.regularTableDataArray = this.arrayKodMinHatzemach(
            this.regularTableDataArray
          );

          this.regularTableDataArray = this.arrayDeleteMisparTochnit(
            this.regularTableDataArray
          );
          // this.handleTableArr(false);
          this.status = res.status;
          this.onatNetia = res.onatNetia;
          this.child.updateStatus();
        },
        (err) => {
          alert('אין נתונים להצגה');
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
  changeFilters(event: any) {
    this.treeTypes = event;
  }

showShortTable():Observable<boolean>{
return this.newOrderPlantsCompleteService.showShortTableAsObs().pipe(map((value)=>{
  if(value){
    
    this.newOrderPlantsCompleteService.emitfilterValue('all')
    this.treeTypes=treeTypes
  }else{

    this.treeTypes=secondTreeTypes
    let numOfRow=0;
     this.tochnitYitzurYaarMishkiByMishtalot(this.AddProductionProcessService.addTochnitYezur.id)
 
  }
  return value
}))

}


  tochnitYitzurYaarMishkiByMishtalot(misparTochnit) {
    try {
      if (this.isFirstTable) {
        this.anotherRegularTableFormArray = this.regularTableFormArray;
        this.regularTableFormArray = [...regularFormSecondTable];
      }
      this.OrderPlantsCompleteService.getTochnitYitzurMishkiMashtelot(
        misparTochnit,
        0
      ).subscribe(
        (res) => {
       
          this.OrderPlantsCompleteService.treeTypes = this.treeTypes;
          this.OrderPlantsCompleteService.listofTableOrderPlantsComplete =
            res.mineTzemach;
          this.treeTypes[0]['count'] = res.ashtaol;
          this.treeTypes[1]['count'] = res.golani;
          this.treeTypes[2]['count'] = res.gilat;
          this.treeTypes[3]['count'] = res.total;
          this.dataSource.load(res.mineTzemach)
          this.regularTableDataArray = this.arraySorting(res.mineTzemach);
         
         },
        (err) => {
          alert('אין נתונים להצגה');
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
  TzmachimLeMishpacha(misparTochnit, kodMishpacha) {
    try {
      this.OrderPlantsCompleteService.getTzmachimLeMishpacha(
        misparTochnit,
        kodMishpacha
      ).subscribe((res) => {
        this.expandableTableDataArray = res;
        res.forEach((element) => {
          element.ashtaol = element.eshtaol;
          element.minHatzemach = element.tzemach;
          delete element.tzemach;
          delete element.eshtaol;
        });
        this.expandableTableDataArray = res;
        // this.OrderPlantsCompleteService.expandableTableDataArray=res
        this.OrderPlantsCompleteService.listofTableOrderPlantsComplete = res;
      });
    } catch (e) {
      console.error(e);
    }
  }
  TzmachimByMashtelot(id) {
    try {
      this.OrderPlantsCompleteService.getTzmachimByMashtelot(
        id.misparTochnit,
        id.id
      ).subscribe((res) => {
   
        if (this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot) {
          this.expdandableTableTablesObj.data = [];
          res.forEach((element) => {
            let object = Object.assign({
              kamut: element.kamut,
              lakoach: element.lakoach,
              phone: element.phone,
              address: element.address,
              email: element.email,

              controllers: false,
            });
            this.expdandableTableTablesObj.data.push(object);
          });
        } else if (this.addBeePlanService.degelOfOrderPlanComplete) {
          this.expdandableTableTablesObj.data = [];
          res.forEach((element) => {
            let object = Object.assign({
              mashtela: element.mashtela,
              kamut: element.kamut,
              lakoach: element.lakoach,
              phone: element.phone,
              address: element.address,
              email: element.email,
              controllers: false,
            });
            this.expdandableTableTablesObj.data.push(object);
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
  getTzmachimByMashtelot(id) {
    try {
      this.OrderPlantsCompleteService.getTochnitYitzurMishkiMashtelotFiltered(
        this.AddProductionProcessService.addTochnitYezur.id,
        id
      ).subscribe((res) => {
        this.expandableTableDataArray = res.mineTzemach;
      });
    } catch (e) {
      console.error(e);
    }
  }

  filterValueObs(): Observable<string> {
    return this.newOrderPlantsCompleteService.filterValueAsObs().pipe(
      map((value) => {
        this.filterValue = value;
        return value;
      })
    );
  }

  //a method to seperate the ID from the array returning from getTochnitYitzurYaarMishki method.
  arraySorting(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.IdArray[i] = arr[i]['id'];
      delete arr[i]['id'];
      arr[i].controllers = true;
    }
    return arr;
  }
  arrayAshtaol(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.IdAshtaol[i] = arr[i]['ashtaol'];
      delete arr[i]['ashtaol'];
      arr[i].controllers = true;
    }
    return arr;
  }
  arrayGolani(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.IdGolani[i] = arr[i]['golani'];
      delete arr[i]['golani'];
      arr[i].controllers = true;
    }
    return arr;
  }
  arrayGilat(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.IdGilat[i] = arr[i]['gilat'];
      delete arr[i]['gilat'];
      arr[i].controllers = true;
    }
    return arr;
  }
  arrayMinHatzemach(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.IdMinAhtzemach[i] = arr[i]['minHatzemach'];
      delete arr[i]['minHatzemach'];
      arr[i].controllers = true;
    }
    return arr;
  }
  arrayTotal(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.IdTotal[i] = arr[i]['total'];
      delete arr[i]['total'];
      arr[i].controllers = true;
    }
    return arr;
  }
  arrayKodMinHatzemach(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.IdKodMinHatzemach[i] = arr[i]['kodMinHatzemach'];
      delete arr[i]['kodMinHatzemach'];
      arr[i].controllers = true;
    }
    return arr;
  }
  arrayDeleteKamut(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.KamutArray[i] = arr[i]['kamut'];
      delete arr[i]['kamut'];
      arr[i].controllers = true;
    }
    return arr;
  }
  arrayDeleteMisparTochnit(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.misparTochnitArray[i] = arr[i]['misparTochnit'];
      delete arr[i]['misparTochnit'];
      arr[i].controllers = true;
    }
    return arr;
  }
  toggleEditHandler(): void {
    this.isOpend = !this.isOpend;
  }
  changeFilterValue(filterValue) {
    if (this.addBeePlanService.degelOfOrderPlanComplete == true) {
      // if (JSON.stringify(this.treeTypes) == JSON.stringify([...treeTypes])) {
      // if (JSON.stringify(this.treeTypes) == JSON.stringify([...treeTypes])) {
      if (filterValue.name == 'מחטניים') {
        this.OrderPlantsCompleteService.idOfMishpacha = 1;
        // this.TzmachimLeMishpacha(
        //   this.AddProductionProcessService.addTochnitYezur.id,
        //   1
        //   );
      }
      if (filterValue.name == 'חורש טבעי') {
        this.OrderPlantsCompleteService.idOfMishpacha = 2;
        // this.TzmachimLeMishpacha(
        //   this.AddProductionProcessService.addTochnitYezur.id,
        //   2
        //   );
      }
      if (filterValue.name == 'אקליפטוס') {
        this.OrderPlantsCompleteService.idOfMishpacha = 3;
        // this.TzmachimLeMishpacha(
        //   this.AddProductionProcessService.addTochnitYezur.id,
        //   3
        //   );
      }
      if (filterValue.name == 'שיטים') {
        this.OrderPlantsCompleteService.idOfMishpacha = 4;
        // this.TzmachimLeMishpacha(
        //   this.AddProductionProcessService.addTochnitYezur.id,
        //   4
        //   );
      }
      if (filterValue.name == 'עצי ושיחי נוי') {
        this.OrderPlantsCompleteService.idOfMishpacha = 5;

        // this.TzmachimLeMishpacha(
        //   this.AddProductionProcessService.addTochnitYezur.id,
        //   5
        //   );
      }
      if (filterValue.name == 'הכול') {
        this.tochnitYitzurYaarMishki(
          this.AddProductionProcessService.addTochnitYezur.id
        );
      }
    }
    else if (
      this.addBeePlanService.degelOfOrderPlanCompleteByMashtelot == true
    ) {
      if (filterValue.name == 'אשתאול') {
        this.OrderPlantsCompleteService.idOfMishpacha = 3

        // this.getTzmachimByMashtelot(3);
        //);
      }
      // } else if (
      //   JSON.stringify(this.treeTypes) == JSON.stringify([...secondTreeTypes])
      // ) {
      //   if (filterValue.name == 'אשתאול') {
      //     this.getTzmachimByMashtelot(3);
      //   }
      if (filterValue.name == 'גולני') {
        this.OrderPlantsCompleteService.idOfMishpacha = 1

        // this.getTzmachimByMashtelot(1);
      }
      if (filterValue.name == 'גילת') {
        this.OrderPlantsCompleteService.idOfMishpacha = 2

        // this.getTzmachimByMashtelot(2);
      }
      if (filterValue.name == 'הכול') {
        // this.newOrderPlantsCompleteService.emitShowShortTable(true)
        this.tochnitYitzurYaarMishkiByMishtalot(
          this.AddProductionProcessService.addTochnitYezur.id
        )
     }
    }
      // if (filterValue.name == 'חורש טבעי') {
      //     this.newOrderPlantsCompleteService.emitShowShortTable(false)
      //     // this.TzmachimLeMishpacha(
      //     //   this.AddProductionProcessService.addTochnitYezur.id,
      //     //   2
      //     //   );
      //     }
      // if (filterValue.name == 'אקליפטוס') {
      // this.newOrderPlantsCompleteService.emitShowShortTable(false)fכf
      // // this.TzmachimLeMishpacha(
      // //   this.AddProductionProcessService.addTochnitYezur.id,
      // //   3
      // //   );
      // }
      // if (filterValue.name == 'שיטים') {
      // this.newOrderPlantsCompleteService.emitShowShortTable(false)
      // // this.TzmachimLeMishpacha(
      // //   this.AddProductionProcessService.addTochnitYezur.id,
      // //   4
      // //   )ss;
      // }
      // if (filterValue.name == 'עצי ושיחי נוי') {
      // this.newOrderPlantsCompleteService.emitShowShortTable(false)
      // // this.TzmachimLeMishpacha(
      // //   this.AddProductionProcessService.addTochnitYezur.id,
      // //   5
      // //   );
      // }
      // if (filterValue.name == 'הכול') {
      // this.newOrderPlantsCompleteService.emitShowShortTable(true)
      // // this.tochnitYitzurYaarMishki(
      // //   this.AddProductionProcessService.addTochnitYezur.id
      // //   );
      // }
   else if (
      JSON.stringify(this.treeTypes) == JSON.stringify([...secondTreeTypes])
    ) {
      if (filterValue.name == 'אשתאול') {
        // this.newOrderPlantsCompleteService.emitShowShortTable(false)
        this.getTzmachimByMashtelot(3);
      }
      if (filterValue.name == 'גולני') {
        // this.newOrderPlantsCompleteService.emitShowShortTable(false)
        this.getTzmachimByMashtelot(1);
      }
      if (filterValue.name == 'גילת') {
        // this.newOrderPlantsCompleteService.emitShowShortTable(false)
        this.getTzmachimByMashtelot(2);
      }
      if (filterValue.name == 'הכול') {
       // this.newOrderPlantsCompleteService.emitShowShortTable(true)
        this.tochnitYitzurYaarMishkiByMishtalot(this.AddProductionProcessService.addTochnitYezur.id
        )
      }
    }
      // if (filterValue.name == 'חורש טבעי') {
      //   // this.newOrderPlantsCompleteService.emitShowShortTable(false)
      //   this.TzmachimLeMishpacha(
      //     this.AddProductionProcessService.addTochnitYezur.id,
      //     2
      //   );
      // }
      // if (filterValue.name == 'אקליפטוס') {
      //   // this.newOrderPlantsCompleteService.emitShowShortTable(false)
      //   this.TzmachimLeMishpacha(
      //     this.AddProductionProcessService.addTochnitYezur.id,
      //     3
      //   );
      // }
      // if (filterValue.name == 'שיטים') {
      //   // this.newOrderPlantsCompleteService.emitShowShortTable(false)
      //   this.TzmachimLeMishpacha(
      //     this.AddProductionProcessService.addTochnitYezur.id,
      //     4
      //   );
      // }
      // if (filterValue.name == 'עצי ושיחי נוי') {
      //   // this.newOrderPlantsCompleteService.emitShowShortTable(false)
      //   this.TzmachimLeMishpacha(
      //     this.AddProductionProcessService.addTochnitYezur.id,
      //     5
      //   );
      // }
      // if (filterValue.name == 'הכול') {
      //   // this.newOrderPlantsCompleteService.emitShowShortTable(true)
      //   this.tochnitYitzurYaarMishki(
      //     this.AddProductionProcessService.addTochnitYezur.id
      //   );
      // }
      // }

      this.filterValue = filterValue.filterValue;
      this.changingValue.next(true);
    }
  public handleFilter(event): void {
    this.selectedArr = event;
  }

  public handleTableArr(condition: boolean): void {
    if (condition) {
      this.isFirstTable = false;
      this.OrderPlantsCompleteService.listofTableOrderPlantsCompleteByMashtelot =
        this.regularTableDataArray;
      this.regularTableFormArray = [...regularFormSecondTable];
      this.selectedHeaderTable = [...regularHeadersSecondTable];
      this.selectedArr = this.regularTableDataArray; //[...regularDataSecondTable];
      this.expandableTableHeaders = expandableSecondTableHeaders;
      this.expdandableTableTablesObj = expandableSecondTableTablesObj;
      this.treeTypes = secondTreeTypes;
      this.filterValue = 'all';
    } else {
      this.isFirstTable = true;
      this.OrderPlantsCompleteService.listofTableOrderPlantsComplete =
        this.regularTableDataArray;
      this.regularTableFormArray = this.regularTableFormArray;
      this.selectedArr = this.regularTableDataArray;
      this.selectedHeaderTable = this.regularTableHeaders;
      this.expandableTableHeaders = expandableTableHeaders;
      this.expdandableTableTablesObj = expdandableTableTablesObj;
      this.treeTypes = treeTypes;
      
      this.filterValue = 'all';
    }
  }
  savechangesInDB(event: any) {
    let status = this.AddProductionProcessService.status.find(
      (x) => x.code == Number(event.status)
    );
    this.title = {
      plantingSeason:
        this.AddProductionProcessService.addTochnitYezur.onatNetia,
      status: status.name,
    };
    let onatNetia = this.AddProductionProcessService.onaotNetia.find(
      (x) =>
        x.name == this.AddProductionProcessService.addTochnitYezur.onatNetia
    );
    let objectToSave = Object.assign({
      id: this.AddProductionProcessService.addTochnitYezur.id,
      onatNetia: onatNetia.code,
      status: event.status,
      hearot: '',
    });
    return this.spatialProductionProgramService
      .editTochnit(objectToSave)
      .subscribe(
        (res) => {
          try {
            if (res) {
              this.AddProductionProcessService.addTochnitYezur.status =
                objectToSave.status;
            }
            if (res.errors != null) {
              if (res.errors.title != null) {
                alert(res.errors.title);
              } else {
                alert('תקלה במערכת, נא לנסות שנית');
              }
            }
          } catch (e) { }
        },
        (error) => {
          if (error.error != null) {
            if (error.error.title != null) {
              alert(error.error.title);
            } else {
              alert('תקלה במערכת, נא לנסות שנית');
            }
          } //Error callbac
        }
      );
  }
  updateFilteredMishtalot(updateFilteredMishtalot: any) {
    this.treeTypes[0].count -= Number(updateFilteredMishtalot.ashtaolFirst);
    this.treeTypes[0].count += Number(updateFilteredMishtalot.ashtaolNow);
    this.treeTypes[1].count -= Number(updateFilteredMishtalot.golaniFirst);
    this.treeTypes[1].count += Number(updateFilteredMishtalot.golaniNow);
    this.treeTypes[2].count -= Number(updateFilteredMishtalot.gilatFirst);
    this.treeTypes[2].count += Number(updateFilteredMishtalot.gilatNow);
    this.treeTypes[3]['count'] -= Number(updateFilteredMishtalot.kamutFirst);
    this.treeTypes[3]['count'] += Number(updateFilteredMishtalot.kamutNow);
  }
}
