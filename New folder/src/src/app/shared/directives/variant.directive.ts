import { Directive, Input, HostBinding } from '@angular/core';
import { StepVariant, StepType } from '../components/cards/card-step/card-step.model';

@Directive({
  selector: '[appVariant]',
})
export class VariantDirective {
  @Input() variant: StepVariant = 'circle';
  @Input() type: StepType;

  @HostBinding('style.border') private border: string;
  @HostBinding('style.border-radius') private radius: string;
  @HostBinding('style.box-shadow') private boxShadow: string;
  @HostBinding('style.background') private background: string;
  @HostBinding('style.background-color') private backgroundColor: string;

  constructor() { }

  ngOnInit() {

    switch (this.variant) {
      case 'circle':

        this.radius = `${5}rem`;

        switch (this.type) {

          case 'step':
            this.boxShadow =
              '0px 3px 3px 1px #dadada, 0px 0px 0px 9px #ececec !important';
            this.background = `linear-gradient(
          0deg, #eeeeee 0%, #fefefe 100%`;

            break;

          case 'status':
            this.boxShadow = '0px 0px 0px 6px #ffffff !important';
            this.backgroundColor = '#ffffff !important';
            this.border = `1px solid #00000029`;
            break;
        }

        break

      case 'square':

        switch (this.type) {

          case 'step':
            this.boxShadow =
              '0px 3px 3px 1px #dadada, 0px 0px 0px 9px #ececec !important';
            this.background = `linear-gradient(
          0deg, #eeeeee 0%, #fefefe 100%`;
            break
        }

    }

  }
}
