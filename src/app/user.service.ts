import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  //A Subject is similar to an observable only that it lets the observer take an active role in demanding new data points (quering next)
  activatedEmitter = new Subject<boolean>();
}
