import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorToastService } from '../error-toast.service';

@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.css']
})
export class ErrorToastComponent implements OnInit {

  constructor(
    private _messageService: MessageService,
    private  _errorToastService: ErrorToastService
  ) {
    
    this._errorToastService.error$.subscribe(x=>
      {
      this._messageService.add({
                                severity:'error', 
                                summary:`Error Status: ${x?.status}`, 
                                detail: x?.message, 
                                sticky: false, 
                                closable: true
                              });
      });
   }

  ngOnInit(): void {

  }
}
