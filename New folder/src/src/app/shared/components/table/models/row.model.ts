import { FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ColumnDef } from '../../columns/column.model';
import { QuestionGroupModel } from '../../form/models/question-group.model';

export class RowModel<T> {
  public item: T;
  // public formGroup: FormGroup;
  // public questionsGroup: Object;
  public form: QuestionGroupModel;
  public disabled: boolean;
  public editable: boolean;
  public expanded: boolean;
  public selectable: boolean;
  public selected: T[];
  public panel?: MatExpansionPanel;
  public activeColumn: ColumnDef<T>;

  constructor(options?: {
    item?: T;
    disabled?: boolean;
    editable?: boolean;
    expanded?: boolean;
    selectable?: boolean;
    selected?: T[];
    panel?: MatExpansionPanel;
    questionsGroup?: {};
  }) {
    this.item = options?.item || null;
    this.disabled = options?.disabled || false;
    this.editable = options?.editable || false;
    this.selectable = options?.selectable || false;
    this.expanded = options?.expanded || false;
    this.selected = options?.selected || [];
    this.panel = options?.panel || null;
  }
}
