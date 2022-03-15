import {
  AfterViewInit,
  OnInit,
  Component,
  ViewChild,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';
import { FormGroup } from '@angular/forms';
import { tableForProductionProcess } from 'src/app/Models/tableForProductionProcess';
import { Router } from '@angular/router';

// export interface ProductionProcessTable {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

export interface ProductionProcessTable {
  position: number;
  season: { text: string; isShmita: boolean };
  planType: string;
  gardening: string;
  status: string;
  lastUpdated: string | Date;
  controllers: string;
}

@Component({
  selector: 'app-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss'],
})
export class ProcessTableComponent implements OnInit, AfterViewInit, OnChanges {
  public pagesCount = 0;
  public currentPage = 1;
  public pageSize = 7;
  public ELEMENT_DATA: tableForProductionProcess[] = [];
  displayedColumns: string[] = [
    'planType',
    'season',
    'gardening',
    'status',
    'lastUpdated',
    'controllers',
  ];
  public plantingSeasonArray: Array<string> = ['test', 'test'];
  public programTypeArray: Array<string> = ['test', 'test'];
  public nurseryArray: Array<string> = ['test', 'test'];
  public statusArray: Array<string> = ['מאושר', 'לא מאושר'];

  dataSource: MatTableDataSource<tableForProductionProcess>;
  dataSourceToShow: MatTableDataSource<tableForProductionProcess>;
  listOfTAble: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private cdRef: ChangeDetectorRef,
    private AddProductionProcess: AddProductionProcessService,
    private route: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngAfterViewChecked() {
    this.listOfTAble =
      this.AddProductionProcess.listForTablesprocessForm.length;
    if (this.AddProductionProcess.listForTablesprocessForm.length > 0) {
      this.ELEMENT_DATA = this.AddProductionProcess.listForTablesprocessForm;
      this.pagesCount = this.ELEMENT_DATA.length / this.pageSize;
      this.dataSource = new MatTableDataSource<tableForProductionProcess>(
        this.ELEMENT_DATA.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        )
      );
      this.dataSourceToShow =
        new MatTableDataSource<tableForProductionProcess>();
      this.cdRef.detectChanges();
    }
    if (this.AddProductionProcess.listForTablesprocessForm.length == 0) {
      this.ELEMENT_DATA = this.AddProductionProcess.listForTablesprocessForm;
      this.pagesCount = this.ELEMENT_DATA.length / this.pageSize;
      this.dataSource = new MatTableDataSource<tableForProductionProcess>(
        this.ELEMENT_DATA.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        )
      );
      this.dataSourceToShow =
        new MatTableDataSource<tableForProductionProcess>();
    }
  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  deleteTochnitYetzur(id: number) {
    if (confirm('האם אתה בטוח שברצונך למחוק את התוכנית??')) {
      return this.AddProductionProcess.deleteTochnitYetzur(id).subscribe(
        (res) => {
          if (res) {
            let index = this.ELEMENT_DATA.findIndex((x) => x.id == id);
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<tableForProductionProcess>(
              this.ELEMENT_DATA.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
              )
            );
            this.pagesCount = this.ELEMENT_DATA.length / this.pageSize;
            if (this.ELEMENT_DATA.length > 1) {
              this.updateTableArray(1);
            }
          }
        }
      );
    }else{
      return []
    }
  }

  updateTableArray(pageNubmer) {
    this.currentPage = pageNubmer;
    if (this.ELEMENT_DATA != null) {
      this.dataSource = new MatTableDataSource<tableForProductionProcess>(
        this.ELEMENT_DATA.slice(
          (pageNubmer - 1) * this.pageSize,
          pageNubmer * this.pageSize
        )
      );
      while (this.dataSource.filteredData.length < this.pageSize) {
        this.dataSource.filteredData.push({
          id: 9,
          onatNetia: { text: '', isShmita: false },
          sugTochnit: '',
          mashtela: '',
          status: '',
          modifiedDate: '',
          //controllers: 'false',
        });
      }
    }
  }
  ngOnInit() {}
  changeTochnitYetzur(objectToAdd) {
    this.AddProductionProcess.TochnitYetzurMerchav = [];
    this.AddProductionProcess.TochnitYetzurMerchav.id = objectToAdd.id;
    this.AddProductionProcess.TochnitYetzurMerchav.mashtela =
      objectToAdd.mashtela;
    this.AddProductionProcess.TochnitYetzurMerchav.modifiedDate =
      objectToAdd.modifiedDate;
    this.AddProductionProcess.TochnitYetzurMerchav.onatNetia =
      objectToAdd.onatNetia;
    this.AddProductionProcess.TochnitYetzurMerchav.status = objectToAdd.status;
    this.AddProductionProcess.TochnitYetzurMerchav.sugTochnit =
      objectToAdd.sugTochnit;
    if (objectToAdd.sugTochnit == 'מרחבית') {
      this.AddProductionProcess.addTochnitYezur = objectToAdd;

      this.route.navigate(['/forestry/spatial-production-program']);
    }
    if (objectToAdd.sugTochnit == 'יער משקי') {
      this.AddProductionProcess.addTochnitYezur = objectToAdd;

      this.route.navigate(['/forestry/order-plants-complete']);
    }
    if (objectToAdd.sugTochnit == 'מרעה דבורים') {
      this.AddProductionProcess.addTochnitYezur = objectToAdd;

      this.route.navigate(['/forestry/add-bee-plan-complete']);
    }
  }
}
