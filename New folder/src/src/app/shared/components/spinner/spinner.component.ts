import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Color, palette } from 'src/styles/theme';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {

  public palate : Color = palette

  @Input() color: ThemePalette = 'primary';
  @Input() value;
  @Input() diameter;

  public spinnerColor : string

  constructor() {}

  ngOnInit(): void {
    this.spinnerColor = this.palate[this.color]
    this.value = this.value || 75
    this.diameter = this.diameter || 30
  }
}
