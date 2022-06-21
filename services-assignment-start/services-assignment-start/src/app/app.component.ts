import { Component, OnInit } from '@angular/core';
import { CounterServiceService } from './shared/counter-service.service';
import { UsersServiceService } from './shared/users-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  activeUsers!: string[];
  inactiveUsers!: string[];
  counter: number = 0;

  constructor(private usersServiceService: UsersServiceService, private counterServiceService: CounterServiceService) { }

  ngOnInit(): void {
    this.activeUsers = this.usersServiceService.activeUsers
    this.inactiveUsers = this.usersServiceService.inactiveUsers
    this.counterServiceService.counterUpdated.subscribe((counter: number) =>  this.counter = counter)
  }

}
