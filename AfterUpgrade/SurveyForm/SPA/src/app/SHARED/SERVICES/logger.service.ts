import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  LogError(error: any, page: string="", method:string="") {
    if (environment.production) {
        //log to databaese  
    }
    console.log(`Page: ${page}, Method: ${method}, Error: ${error}`);
  }
}
