import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noncompliant',
  templateUrl: './noncompliant.component.html',
  styleUrls: ['./noncompliant.component.css']
})
export class NoncompliantComponent implements OnInit {
  _currentDateTime: Date

  constructor() { }

  ngOnInit(): void {
    this._currentDateTime = new Date()
  }

}
