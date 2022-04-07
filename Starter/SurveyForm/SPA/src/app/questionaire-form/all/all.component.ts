import { Component, OnInit } from '@angular/core';
import { IQuestionaireForm } from 'src/app/SHARED/model-contracts';
import { QuestionaireFormRepositoryService } from '../questionaire-form-repository.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  _allQuestionaireForms: IQuestionaireForm[]
  searchResult: any[] = [];

  constructor(
                private _repo: QuestionaireFormRepositoryService
  ) { }

  ngOnInit(): void {
      this.getAll("");
  }

  getAll(searchTerm: string)
  {
        this._repo.getAll(searchTerm).subscribe(x=>{
            this._allQuestionaireForms = x;
        });
  }

  searchUser(event) {
    let searchTerm = event.query;
    
    this._repo.searchFullnames(searchTerm).subscribe(result=>{  
      this.searchResult = result;
    });

    this.getAll(searchTerm);
  }

  onSelectUser(event)
  {
  
    let searchTerm = event;
    this.getAll(searchTerm);
  }

  convertTrueFalse(value: boolean)
  {
      let returnValue = "No";

      if(value)
      {
        returnValue = "Yes";
      }

      return returnValue;
  }
}
