import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kkl-search-layout',
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss'],
})
export class SearchLayoutComponent implements OnInit {

  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
