import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersServiceService } from '../shared/users-service.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
})
export class ActiveUsersComponent implements OnInit {

  users!: string[]

  constructor(private usersServiceService: UsersServiceService) { }

  ngOnInit(): void {
    this.users = this.usersServiceService.activeUsers
  }

  onSetToInactive(id: number) {
    this.usersServiceService.onSetToInactive(id)
  }

}
