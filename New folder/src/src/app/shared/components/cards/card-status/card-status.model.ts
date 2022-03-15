import {
  CardStepModel,
  StepType,
  StepVariant,
} from '../card-step/card-step.model';

export class CardStatusModel extends CardStepModel {

  public options? : any[];

  constructor(options?: {
    label?: string;
    path?: string;
    svgUrl?: string;
    variant?: StepVariant;
    type?: StepType;
    size?: number;
    value?: number;
    options? : any[]
  }) {
    super(options);
    this.label = options?.label || '';
    this.path = options?.path || 'search';
    this.svgUrl = options?.svgUrl || 'reload';
    this.variant = options?.variant || 'circle';
    this.type = options?.type || 'status';
    this.size = options?.size || 6;
    this.value = options?.value || null;
    this.options = options?.options || [],
    this.spacer = true;

  }
}
