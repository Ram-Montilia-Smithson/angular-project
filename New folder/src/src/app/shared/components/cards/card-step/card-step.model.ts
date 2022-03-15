import { MenuItemModel } from "../../menu-item/menu-item.model";

export type StepVariant = 'circle' | 'square'


export type StepType = 'wizard' | 'status' | 'step' | 'info' | 'card' | 'icon'


export type StepperDirection = 'column' | 'row'


export class CardStepModel extends MenuItemModel {

  public variant?: StepVariant;
  public type?: StepType;
  public size?: number;
  public divider?: number;
  public spacer?: boolean;
  public value?: number;

  constructor(options?: {
    label?: string;
    path?: string;
    svgUrl?: string;
    isActive?: boolean;
    variant?: StepVariant;
    type?: StepType;
    size?: number;
    divider?: number;
    spacer?: boolean;
    value?: number;
  }) {
    super(options)
    this.label = options?.label || '';
    this.path = options?.path || '';
    this.isActive = options?.isActive || false;
    this.svgUrl = options?.svgUrl || '';
    this.variant = options?.variant || 'circle';
    this.type = options?.type || 'step';
    this.size = options?.size || 6;
    this.value = options?.value || null;
    this.divider = options?.divider || 0;
    this.spacer = options?.spacer || false;
  }



}
