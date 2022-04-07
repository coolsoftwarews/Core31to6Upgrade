import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingHandlerService {

  constructor() { }

  // Show
  private showSubject$ = new BehaviorSubject<boolean>(false);
  show$ = this.showSubject$.asObservable();

  //Hide
  private hideSubject$ = new BehaviorSubject<boolean>(false);
  hide$ = this.hideSubject$.asObservable();

  //called by the HTTP Interceptor
  show(): void 
  { 
    this.showSubject$.next(true);
  }

  //called by the HTTP Interceptor
  hide():void {
    this.hideSubject$.next(true);
  }
}
