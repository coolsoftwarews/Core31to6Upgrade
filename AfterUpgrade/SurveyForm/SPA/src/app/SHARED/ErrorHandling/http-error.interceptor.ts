import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { ErrorToastService } from './error-toast.service';
import { LoadingHandlerService } from '../loading-handling/loading-handler.service';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private _errorToastService: ErrorToastService,
    private _loadingHandlerService: LoadingHandlerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    //show progress spinner
    this._loadingHandlerService.show();
    
    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {
        
        //show more detail
       // console.log("Error from error interceptor", error);
        this._errorToastService.show(error.message ?? JSON.stringify(error), error.status);
        return throwError(error);
      }),
      finalize(() => {
    
      //show progress spinner
        this._loadingHandlerService.hide();
      })
      
    ) as Observable<HttpEvent<any>>;
  }
}
