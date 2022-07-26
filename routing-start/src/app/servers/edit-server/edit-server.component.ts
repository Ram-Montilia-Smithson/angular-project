import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let params = this.route.snapshot.params
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1'
      }
    );
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(+params.id); // same as Number(params.id)
    this.serverName = this.server.name;
    this.serverStatus = this.server.status; 
  }

  onUpdateServer() {
    this.serversService.updateServer(
      this.server.id,
      {
        name: this.serverName,
        status: this.serverStatus
      });
    this.changesSaved = true;
  }

}
