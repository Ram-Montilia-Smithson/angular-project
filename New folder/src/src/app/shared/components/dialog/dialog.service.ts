import { ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable, TemplateRef } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { DialogComponent } from './dialog.component';

export interface DialogData {
  type: string;
  payload: any;
}
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {}

  public open(
    dialogRef?: TemplateRef<any>,
    config?: MatDialogConfig
  ): MatDialogRef<DialogComponent> {
    return this.dialog.open(dialogRef || DialogComponent, config);
  }
  public openAlert(
    config?: MatDialogConfig
  ): MatDialogRef<DialogAlertComponent> {
    return this.dialog.open(DialogAlertComponent, config);
  }
}
