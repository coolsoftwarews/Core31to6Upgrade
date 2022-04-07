import { Injectable, Inject } from '@angular/core';
import { Observable, Operator } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from 'src/app/SHARED/SERVICES/environment-url.service'
import {  IUser } from 'src/app/SHARED/model-contracts';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

  private profileUrl: string;

  constructor(private http: HttpClient,
    private envUrl: EnvironmentUrlService) {
    this.profileUrl = this.envUrl.urlAddress + '/api/profiles';
  }

  getLoggedInProfile() : Observable<IUser>
  {

    //todo: need to change the profile service 
    return this.http.get<IUser>(`${this.envUrl.urlAddress}/api/users/userName`);
  }
}
