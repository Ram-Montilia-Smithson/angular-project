import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/shared/services/route.service';

@Component({
  selector: 'app-collect-seeds-iframe',
  templateUrl: './collect-seeds-iframe.component.html',
  styleUrls: ['./collect-seeds-iframe.component.scss']
})
export class CollectSeedsIframeComponent implements OnInit {

  constructor(private routerService: RouterService ) { }

  ngOnInit(): void {
  }

  public onPrevious(): void {
    this.routerService.goBack();
  }
}
