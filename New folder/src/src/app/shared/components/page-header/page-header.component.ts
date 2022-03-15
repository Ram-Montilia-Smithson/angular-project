import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PageHeaderModel } from './page-header,model';
import { PageHeaderService } from './page-header.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Output() toggleEditEmitter: EventEmitter<any> = new EventEmitter();
  @Output() downloadEmitter: EventEmitter<any> = new EventEmitter();
  @Input() formOpen: boolean = false;
  public headerItems$: Observable<PageHeaderModel[]>;
  public comment$: Observable<string>;
  constructor(private pageHeadeService: PageHeaderService) {}

  ngOnInit(): void {
  

    this.comment$ = this.pageHeadeService.getComment();
    this.headerItems$ = this.pageHeadeService.getHeaderItems();
  }

  toggleEdit() {
    this.toggleEditEmitter.emit();
  }

  downloadExcel() {
    this.downloadEmitter.emit();
  }
}
