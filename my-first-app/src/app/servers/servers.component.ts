import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html'
  // יש מספר דרכים להוסיף סטיילינג לקומפוננט
  // אפשר לרפרר לקובץ ססס
  // או להוסיף בקומפוננט ישירות, לדוגמא תסתכל בקומפוננט התראת אזהרה
})
export class ServersComponent {

  allowNewServer = false;
  serverCreationStatus = "No server was created!";
  serverName = ""
  serverCreated = false
  servers = ['Testserver', 'Testserver 2']

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true
    }, 2000);
  }

  onCreateServer(event: any) {
    console.log(event.target.value);
    this.servers.push(this.serverName);
    this.serverCreated = !this.serverCreated;
  }
}
