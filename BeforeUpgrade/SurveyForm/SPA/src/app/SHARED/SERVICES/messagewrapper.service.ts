import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class MessageWrapperService {
  public silent: boolean = false;

  constructor(
            private _messageService: MessageService,
            private _logger: LoggerService
            ) { }

  showDebug(message: string) {
    if (!environment.production) {
      this._messageService.add({severity:'info', summary: "Debug", detail: message});
    }
  }

  showInfo(message: string) {
    if (this.silent) {
      this.showDebug(message);
    } else {
      this._messageService.add({severity:'info', summary: "Info", detail: message});
    }
  }

  showSuccess(message: string) {
    if (this.silent) {
      this.showDebug(message);
    } else {
      this._messageService.add({severity:'success', summary: "Successful", detail: message});
    }
  }

  showSuccessMessageOnly(message: string) {
    if (this.silent) {
      this.showDebug(message);
    } else {
      this._messageService.add({severity:'success', detail: message});
    }
  }

  showSuccessWithTitle(message: string, title: string) {
    if (this.silent) {
      this.showDebug(message);
    } else {
      this._messageService.add({severity:'success', summary: title, detail: message});
    }
  }

  showWarning(message: string) {
    this._messageService.add({severity:'warning', summary: "Warning", detail: message});
  }

  showError(error: any) {
    if (error.message) {
      this._messageService.add({severity:'error', summary: error.name, detail: error.message});
    } else {
      this._messageService.add({severity:'error', summary: error.Name, detail: error.Message});
    }
    if (error.error) {
      this.showError(error.error);
    }
  }

  showWarningForError(error: any) {
    if (error.message) {
      this._messageService.add({severity:'warning', summary: error.name, detail: error.message});
    } else {
      this._messageService.add({severity:'warning', summary: error.Name, detail: error.Message});
    }
    if (error.error) {
      this.showError(error.error);
    }
  }

  showAndLogError(error: any) {
    if (error.message) {
      this._messageService.add({severity:'error', summary: error.name, detail: error.message});
    } else {
      this._messageService.add({severity:'error', summary: error.Name, detail: error.Message});
    }
    
    this._logger.LogError(error);

    if (error.error) {
      this.showAndLogError(error.error);
    }
  }

  showAndLogErrorAndTitle(error: any, title: string) {

    console.log(error);

    if (error.message) {
    
      this._messageService.add({severity:'error', summary: error.name, detail: error.message});
    } else {
      console.log("step2");
      //this._messageService.add({severity:'error', summary: error.title, detail: error.type});
    }
    console.log("step4");
    
    
    if (error.error) {
      this.showAndLogErrorAndTitle(error.error, title);
    }
  }

  showErrorMessage(errorMessage: string) {
    if (errorMessage) {
      this._messageService.add({severity:'error', detail: errorMessage});
    } else {
      this._messageService.add({severity:'error'});
    }
  }
}
