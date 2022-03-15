import { Component, Inject, OnInit } from '@angular/core';
import { MODULE_PREFIX } from 'src/app/shared/constants/module-prefix';
import { RouterService } from 'src/app/shared/services/route.service';

@Component({
  selector: 'kkl-outlet',
  templateUrl: './outlet.component.html',
})
export class OutletComponent implements OnInit {

  constructor(
    @Inject(MODULE_PREFIX) public modulePrefix: string,
    private routerService : RouterService

  ) { }

  ngOnInit(): void {
    this.routerService.emitModulePrefix(this.modulePrefix)
  }
}
