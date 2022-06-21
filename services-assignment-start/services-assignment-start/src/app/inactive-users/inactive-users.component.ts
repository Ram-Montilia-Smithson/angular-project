import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersServiceService } from '../shared/users-service.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
})
export class InactiveUsersComponent implements OnInit {

  users!: string[]

  constructor(private usersServiceService: UsersServiceService) { }

  ngOnInit(): void {
    this.users = this.usersServiceService.inactiveUsers
  }

  onSetToActive(id: number) {
    this.usersServiceService.onSetToActive(id)
  }

}
