import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { MessageWrapperService } from './messagewrapper.service'
import { environment } from '../../../environments/environment';
import { LoggerService } from './logger.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
            private _messageWrapperService: MessageWrapperService,
            private _logger: LoggerService

  ) { 


    console.log(" constructor",this._messageWrapperService);
  }


  public handleError(err): Observable<never> {
 
    if(this._messageWrapperService === undefined)
    {
      this._messageWrapperService = new MessageWrapperService(new MessageService(),new LoggerService());
    }

    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
 
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
   
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    

    console.log(" service",this._logger);

    if(environment.production)
    {
      this._messageWrapperService.showError(throwError('An unexpected error occurred. Refresh your browser and try again.'));
    }else{
       this._messageWrapperService.showAndLogErrorAndTitle(err, 'Current Page');
    }

    console.log("step3");
    return throwError(errorMessage);
  }
}
