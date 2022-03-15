import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public urlAdress = '/';
  public prefix = '';
  public showSteps = true;
  showWizard$:Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => {
        console.log(result.matches);
        return result.matches
      }),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userDataService: UserDataService,
    private breakpointsServise: BreakpointService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.prefix = this.userDataService.user.urlPrefix;
    this.router.events.subscribe((val: any) => {
      this.urlAdress = val.url ? val.url : this.urlAdress;
      this.showSteps =
        this.urlAdress !== '/forestry' &&
        this.urlAdress !== '/education' &&
        this.urlAdress !== '/login'
          ? true
          : false;
    });
  }

  ngOnInit(): void {
    this.showWizard$= this.breakpointsServise.isMobile()
    this.isHandset$.subscribe();
  }
}
