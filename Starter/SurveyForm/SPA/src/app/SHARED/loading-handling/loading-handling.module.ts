import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoaderComponent} from './loader/loader.component'
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoadingHandlerService } from './loading-handler.service';


@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ],
  providers: [
    NgxSpinnerService
 ],
  exports: 
  [
    LoaderComponent
  ]
})
export class LoadingHandlingModule { }
