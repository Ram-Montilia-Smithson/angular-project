import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'forest-management';
  openAll: boolean = false;
  multi: boolean = true;

  panels = [
    {
      id: 1,
      expanded: true,
      title: 'מנה 1',
      content: 'עם תוכן בתור טקסט',
    },
    {
      id: 2,
      expanded: false,
      title: 'מנה 2',
    }
  ]

  onPanelOpen(id: number): void {
    this.panels.forEach(panel => {if(panel.id === id) panel.expanded = true})
    this.checkAllOpen()
  }

  onPanelClosed(id: number): void {
    this.panels.forEach(panel => {if(panel.id === id) panel.expanded = false})
    this.checkAllOpen()
  }

  // for controlling the checkbox events
  toggleOpenAll(bol: boolean): void {
    this.panels.forEach(panel => panel.expanded = bol)
    this.openAll = bol
  }

  // to sync between the panels and the checkbox
  checkAllOpen(): void {
    let isAllOpen: boolean = true
    this.panels.forEach(panel => {if (!panel.expanded) isAllOpen = false})
    this.openAll = isAllOpen
  }

}
