import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner-old',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class OldSpinnerComponent implements OnInit {
  mode: ProgressSpinnerMode = 'indeterminate';
  constructor() { }

  ngOnInit(): void {
  }

}
