import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['.container {margin-top: 30px;}']
})
export class AppComponent {

  // in developer tools/sources/top/webpack:// - you can find all your files of angular and use a debugger to find errors

  // life cycle methods:
  // ngAfterContentInit runs when the parent component's ng-content has been projected into the view
  // ngAfterContentChecked runs every time the projected content has been checked
  // ngAfterViewInit runs after the component's view and it's children's has been initialized
  // ngAfterViewChecked runs every time the component's view and it children's have been checked
  // ngOnDestroy runs once, just before the component is destroyed

  serverElements = [];

  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  eventName3(blueprintData : {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  onChangeFirst() {
    this.serverElements[0].name = "changed!"
  }

}
