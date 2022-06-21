import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  logStatusChange(status: string, name: string) {
    console.log('A ' + name + ' server status changed, new status: ' + status);
  }
}
