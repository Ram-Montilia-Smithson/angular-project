import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['.container {margin-top: 30px;}']
})
export class AppComponent {

  // in developer tools/sources/top/webpack:// - you can find all your files of angular and use a debugger to find errors

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

  onDestroyFirst() {
    this.serverElements.splice(0,1)
  }

  // game control
  oddNumbers: number[] = []
  evenNumbers: number[] =[]

  onEverySecond(number: number) {
    if (number % 2 === 0) {
      this.evenNumbers.push(number)
    } else {
      this.oddNumbers.push(number)
    }
  }

}
