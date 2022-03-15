import { BaseCdkCell } from '@angular/cdk/table';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-working-content',
  templateUrl: './working-content.component.html',
  styleUrls: ['./working-content.component.scss'],
})
export class WorkingContentComponent implements OnInit {
  @Input() activeStep = 0;
  @Output() changeActiveStep = new EventEmitter();
  @Input() allContentOfTables;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  setActiveStep(number) {
    if (number == -1) {
      this.router.navigate(['forestry/results'])
      return;
    }
    let newActiveStep = +this.activeStep + +number;
    this.changeActiveStep.emit(newActiveStep);
  }
}
