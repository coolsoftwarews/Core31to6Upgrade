import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorToastComponent } from './error-toast/error-toast.component';

import { ErrorToastService} from './error-toast.service';
import { GlobalErrorHandlerService} from './global-error-handler.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [ErrorToastComponent],
  imports: [
    CommonModule,
    ToastModule
  ],
  providers: [
    ErrorToastService,
    MessageService,
    GlobalErrorHandlerService,
    { 
      provide: ErrorHandler, 
      useClass: GlobalErrorHandlerService
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpErrorInterceptor, 
      multi: true
    }
  ],
  exports: [
    ErrorToastComponent,

    ToastModule
  ]

})
export class ErrorHandlingrModule { }
