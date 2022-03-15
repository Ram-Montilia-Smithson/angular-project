import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userDataService: UserDataService,private router:Router) {
    this.prefix = this.userDataService.user.urlPrefix
    this.wizardItems = this.userDataService.componentType[this.prefix].wizardItems
  }
  public hideWizard:boolean;
  public chosenWizardItem = 2;
  public prefix = ''
  public wizardItems = [

  ];

  public changeWizardItem(index: number,item:any) {
    this.chosenWizardItem = index;
    console.log(item);
    this.router.navigateByUrl(item.url)
  }


  ngOnInit(): void {
    const route = this.router.events
    .pipe(first())
    .subscribe((res:any) => {
      if(res.url === '/forestry/dashboard'){
        this.hideWizard = true;
      } else {
        this.hideWizard = false;
      }
    });
    
   }
}
