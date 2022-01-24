import { Component } from '@angular/core';

@Component({
  // יש מספר דרכים לרפרר בין הקומפוננט לטמפלייט, תסתכל בסרברס טמפלייט
  // selector: '[app-server]', through HTML attribute
  // selector: '.app-server', through class name
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [`
    .online {
      color: white
    }
  `]
})
export class ServerComponent {
  // defining string variables here, then i can use them in the template
  serverId: number = 10;
  serverStatus: string = 'offline'

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline'
  }

  // i can also use functions in string interpolation, as long as it returns a string or a number value
  getServerStatus() {
    return this.serverStatus
  }

  // used with [ngModel] to return a color for the background
  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red'
  }
}
