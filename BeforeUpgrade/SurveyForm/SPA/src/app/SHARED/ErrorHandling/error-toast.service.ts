import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorToastService {
 // Show
 private errorSubject$ = new BehaviorSubject<any>(undefined);
 error$ = this.errorSubject$.asObservable();

  constructor() { }

  show(message?: string, status?: number)
  {
    this.errorSubject$.next({
      message: message,
      status: status
    });
   
  }
}
