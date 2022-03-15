import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageHeaderModel } from './page-header,model';

@Injectable({
  providedIn: 'root',
})
export class PageHeaderService {
  private headerItems$: BehaviorSubject<PageHeaderModel[]>;
  private comment$: BehaviorSubject<string>;
  constructor() {
    this.comment$ = new BehaviorSubject<string>('');
    this.headerItems$ = new BehaviorSubject<PageHeaderModel[]>([]);
  }
  public getComment(): Observable<string> {
    return this.comment$.asObservable();
  }

  public emitComment(comment: string): void {
    this.comment$.next(comment);
  }

  public getHeaderItems(): Observable<
    PageHeaderModel[]
  > {
    return this.headerItems$.asObservable();
  }

  public emitHeaderItems(
    items: PageHeaderModel[]
  ): void {
    this.headerItems$.next(items);
  }
}
