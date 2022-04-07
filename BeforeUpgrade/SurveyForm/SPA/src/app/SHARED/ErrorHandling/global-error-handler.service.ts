import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import {ErrorToastService} from './error-toast.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
                private _errorToastService: ErrorToastService, 
                private zone: NgZone
                ) {}

  handleError(error: Error) {

    this.zone.run(() =>
      this._errorToastService.show(
        error.message || "Undefined client error"
    ));
    
    //show more detail
    console.error("Error from global error handler", error);
  }
} 
