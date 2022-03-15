import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() menuToggle = new EventEmitter();

    public status = [
      {
        text: 'בתכנון',
        src: 'assets/images/reload.svg',
        count: 2,
      },
      { text: 'בביצוע', src: 'assets/images/time-left.svg', count: 8 },
      { text: 'בהקפאה', src: 'assets/images/freezing.svg', count: 0 },
    ];
  
  public platformName: string =''
  public isOpen: boolean = true;
  public urlAdress = 'main';
  public showSteps = true;
  public componentType = '';
  public prefix=''
  public leftLogo=''
  public toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menuToggle.emit();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {

     this.prefix = this.userDataService.user.urlPrefix;
    this.status = this.userDataService.componentType[this.prefix].navbarProjectSteps;
    this.platformName=this.userDataService.componentType[this.prefix].platformName
    this.leftLogo=this.userDataService.componentType[this.prefix].leftLogoUrl
    this.router.events.subscribe((val: any) => {

      this.urlAdress = val.url ? val.url : this.urlAdress;

      this.showSteps =
        this.urlAdress === '/forestry' ||
        this.urlAdress === '/education' ||
        this.urlAdress === '/education/search' ||
        this.urlAdress === '/education/my-tours' ||
        this.urlAdress === '/forestry/search'
          ? true
          : false;
    });
  }

  ngOnInit(): void {}
}
