import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment'

import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { IQuestionaireForm } from '../SHARED/model-contracts';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  
@Injectable()
export class QuestionaireFormRepositoryService {

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
   

  constructor(private http:HttpClient) {}

  public searchFullnames(searchText: string)
  {
      return this.http.get<string[]>(`${environment.webApiUrl}/api/lookup?searchText=${searchText}`) // should always be profile id of zero
      .pipe(
      //tap(data=> console.log(data))
    );
  }

    public getAll(search: string)
    {
        return this.http.get<IQuestionaireForm[]>(`${environment.webApiUrl}/api/questionaire?searchQuery=${search}`) // should always be profile id of zero
        .pipe(
        //tap(data=> console.log(data))
      );
    }
    
    public view()
    {
        return this.http.get<IQuestionaireForm>(`${environment.webApiUrl}/api/questionaire/0`) // should always be profile id of zero
        .pipe(
        //tap(data=> console.log(data))
      );
    } 
    
    public getNewForm()
    {
        return this.http.get<IQuestionaireForm>(`${environment.webApiUrl}/api/questionaire/0`) // should always be profile id of zero
        .pipe(
         //tap(data=> console.log(data))
       );
    } 

    public submitForm(form: IQuestionaireForm):Observable<IQuestionaireForm>
    {
        return this.http.post<IQuestionaireForm>(`${environment.webApiUrl}/api/questionaire`, form, this.generateHeaders()) // should always be profile id of zero
        .pipe(
         //tap(data=> console.log(data))
       );
    }  
}