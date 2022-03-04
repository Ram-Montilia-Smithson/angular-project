import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '@ComraxLTD/kakal-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private dialog: MatDialog // private dialogService: DialogService
  ) {}
  public storybookUrl!: string;

  public onOpen() {

    //for more configuration of the dialog component see angular material docs
    this.dialog.open(DialogAlertComponent, {
      data: {
        title: 'לא ניתן לבצע הרחבה',
        buttonText: {
          confirm: 'אישור',
        },
      },
      minWidth: '30rem',
      minHeight:'30rem'
    });
  }
}
