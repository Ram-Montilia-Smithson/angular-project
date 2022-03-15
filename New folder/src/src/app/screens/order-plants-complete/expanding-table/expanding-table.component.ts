import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AddProductionProcessService } from 'src/app/services/add-production-process.service';

@Component({
  selector: 'app-expanding-table',
  templateUrl: './expanding-table.component.html',
  styleUrls: ['./expanding-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ExpandingTableComponent implements OnInit,OnChanges {
  @Input() tableHeaders = [];
  // @Input() tableHeadersHebrew = []
  tableHeadersHebrew = []
  tableHeadersEnglish = []
 
  @Input() tableDataToShow:any = [];
  tableDataArrayKeys = [];
  @Input() insideTableArray = {};
  @Output() TzmachimByMashtelotChild = new EventEmitter<object>();

  callParent(  id): void {
    this.TzmachimByMashtelotChild.emit({misparTochnit: this.addProductionProcess.addTochnitYezur.id ,id:id});
  }
  constructor(private changeDetection: ChangeDetectorRef,private addProductionProcess:AddProductionProcessService) {

  }

  ngOnInit(): void {
    this.tableHeaders = [...this.tableHeaders.map(header => {
      this.tableHeadersHebrew.push(header.hebrew)
      this.tableHeadersEnglish.push(header.english)
      return header.english

    })]

    if (this.tableDataToShow[0]) {
      
      this.tableDataArrayKeys = Object.keys(this.tableDataToShow[0]).filter(
        (key) => key !== 'controllers'
      );
    }
  }


  ngOnChanges(changes: SimpleChanges): void {}
  toggleRow(i) {
    console.log(i);
  }
}
