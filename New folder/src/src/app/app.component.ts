import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forstClient';
    public urlAdress = ' login';
    public found = true;
    public routes = [];
    ngOnInit(): void {
      this.routes = this.router.config.map((config) => config.path);
    }
  
    constructor(private router: Router) {
      // this.router.events.subscribe((val: any) => {
      //   if (this.routes.length > 0 && val.url) {
      //     this.found =
      //       this.routes.findIndex((route) => '/' + route === val.url) >= 0
      //         ? true
      //         : false;
      //   }
      //   this.urlAdress = val.url ? val.url : this.urlAdress;
      // });
    }


}
