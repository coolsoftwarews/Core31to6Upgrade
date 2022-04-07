import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingHandlerService } from '../loading-handler.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(
          private _loadingHandlerService: LoadingHandlerService,
          private _spinner: NgxSpinnerService
  ) {

   
   }

  ngOnInit(): void {
 
    this._loadingHandlerService.show$.subscribe(x=>{
      this._spinner.show();
  });

  this._loadingHandlerService.hide$.subscribe(x=>{
      this._spinner.hide();
  });
  }

}
