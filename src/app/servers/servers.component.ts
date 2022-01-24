import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  // יש מספר דרכים להוסיף סטיילינג לקומפוננט
  // אפשר לרפרר לקובץ ססס
  // או להוסיף בקומפוננט ישירות, לדוגמא תסתכל לקומפוננט התראת אזהרה
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {

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

  ngOnInit(): void {}

  onCreateServer(event: any) {
    console.log(event.target.value);
    this.servers.push(this.serverName);
    this.serverCreated = !this.serverCreated;
  }
}
