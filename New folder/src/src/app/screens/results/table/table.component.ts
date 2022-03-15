import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AllSearchUnitsForWorkDilution } from 'src/app/Models/AllSearchUnitsForWorkDilution';
import {Router} from '@angular/router';
import { elementAt } from 'rxjs/operators';
import { GridScreenService } from 'src/app/services/grid-screen.service';
import { MatTableDataSource } from '@angular/material/table';
export interface resultsTable {
  position: number;
  date: string;
  unit: string;
  status: string;
  region: string;
  area: string;
  forest: string;
}

/*const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    date: '2021',
    unit: "T12037",
    status: 'מאושר',
    region: 'צפון',
    area: 'גליל עליון',
    forest: 'יער ביריה',
  },
  {
    position: 2,
    date: '2021',
    unit: "T12038",
    status: 'מאושר',
    region: 'צפון',
    area: 'גליל עליון',
    forest: 'יער ביריה',
  },
  {
    position: 3,
    date: '2021',
    unit: "T12039",
    status: 'מאושר',
    region: 'צפון',
    area: 'גליל עליון',
    forest: 'יער ביריה',
  },
  
];*/

/**
 * @title Basic use of `<table mat-table>`
 */



@Component({ 
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit  {
  displayedColumns: string[] = [ 'date', 'unit', 'status', 'region','area','forest'];
  ELEMENT_DATA :AllSearchUnitsForWorkDilution[];
  public pagesCount = 0;
  public currentPage = 1;
  public pageSize = 9; 
  listOfGlobalID:string[]=[];
  ListOfWorkUnit:MatTableDataSource<AllSearchUnitsForWorkDilution> ;
@Output() listOfGlobal = new EventEmitter();
  @Input() workUnitToSearch;
  constructor(private route:Router, private gridScreenService:GridScreenService) {
   
  }
 ngOnInit(){ 
    
   try{
  this.gridScreenService.getAllSearchUnitsWorkForDilution(this.workUnitToSearch).subscribe(res=>{
    this.ELEMENT_DATA= res;
 this.ELEMENT_DATA.forEach(element => {
      this.listOfGlobalID.push(element.globalID);
    });
    this.listOfGlobal.emit(this.listOfGlobalID);
    if(this.ELEMENT_DATA.length==0)
  {
    alert("לא נמצאו נתונים!!");
    return
  }

    else{
    this.ListOfWorkUnit = new MatTableDataSource<AllSearchUnitsForWorkDilution>(
      this.ELEMENT_DATA.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    );
      }
    this.pagesCount = this.ELEMENT_DATA.length / this.pageSize;

  })
}
catch(e){}
}
 
updateTableArray(pageNubmer) {
  this.currentPage = pageNubmer;

  this.ListOfWorkUnit = new MatTableDataSource<AllSearchUnitsForWorkDilution>(
   this. ELEMENT_DATA.slice(
      (pageNubmer - 1) * this.pageSize,
      pageNubmer * this.pageSize
    )
  );

  while (this.ListOfWorkUnit.filteredData.length < this.pageSize) {
    this.ListOfWorkUnit.filteredData.push({
      globalID:'',
      objectID: 5,
      workYear: '',
      trtUnit: '',
      wpfsRequestStatus: '',
      regionName: '',
      districtName: '',
      for_NO: '',
    });
  }
}
  navigateToWorkUnit(workUnit:any){
     
    this.gridScreenService.objectForWorkUnitAfterSearch.globalID= workUnit.globalID; 
 this.gridScreenService.objectForWorkUnitAfterSearch.objectID= workUnit.objectID;
    this.gridScreenService.objectForWorkUnitAfterSearch.regionName= workUnit.regionName;
    this.gridScreenService.objectForWorkUnitAfterSearch.trtUnit= workUnit.trtUnit;
    this.gridScreenService.objectForWorkUnitAfterSearch.workYear= workUnit.workYear;
    this.gridScreenService.objectForWorkUnitAfterSearch.wpfsRequestStatus= workUnit.wpfsRequestStatus;
    this.gridScreenService.objectForWorkUnitAfterSearch.for_NO= workUnit.for_NO;
    this.gridScreenService.objectForWorkUnitAfterSearch.foR_Name= workUnit.foR_Name;
    this.gridScreenService.objectForWorkUnitAfterSearch.districtName= workUnit.districtName;
this.route.navigate(['work-unit']);
  }
}
