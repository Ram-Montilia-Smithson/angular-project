import { Component, Input, OnInit } from '@angular/core';
import { IconModel } from '../../components/icon/icon.model';
import { LayoutService } from './layout.service';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointService } from '../../services/breakpoint.service';
import { RouterService } from '../../services/route.service';

@Component({
  selector: 'kkl-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @Input() public openIcon: string;
  @Input() public logos: IconModel[];
  @Input() public hideWizardPath: string[];
  @Input() public showStatusPath: string[];

  public currentPath$: Observable<string>;
  public wizard$: Observable<boolean>;
  public show$: Observable<boolean>;
  public mobile$: Observable<boolean>;

  constructor(
    private routerService : RouterService,
    private breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {
    this.currentPath$ = this.routerService.getLastPathObs();
    this.show$ = this.handleState(this.showStatusPath);
    this.wizard$ = this.handleState(this.hideWizardPath);
    this.mobile$ = this.breakpointService.isMobile();
  }
  private handleState(list: string[]) {
    return this.currentPath$.pipe(
      map((path: string) => {
        return this.findPath(list, path);
      })
    );
  }

  private findPath(list: any[], value: string): boolean {
    return !!list.find((path: string) => path == value);
  }
}
