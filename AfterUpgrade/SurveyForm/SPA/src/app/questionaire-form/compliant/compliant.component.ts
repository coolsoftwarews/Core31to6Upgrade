import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compliant',
  templateUrl: './compliant.component.html',
  styleUrls: ['./compliant.component.css']
})
export class CompliantComponent implements OnInit {
  _currentDateTime: Date

  constructor() { }

  ngOnInit(): void {
    this._currentDateTime = new Date()
  }

}
