import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-working-header',
  templateUrl: './working-header.component.html',
  styleUrls: ['./working-header.component.scss']
})
export class WorkingHeaderComponent implements OnInit {
  @Input() allHeadersToDisplay;

  constructor() { }

  ngOnInit(): void {
  }

}
