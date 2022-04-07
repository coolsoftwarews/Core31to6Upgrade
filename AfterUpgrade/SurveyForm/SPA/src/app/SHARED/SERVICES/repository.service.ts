import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { EnvironmentUrlService } from 'src/app/SHARED/SERVICES/environment-url.service';
import { IUser } from '../model-contracts';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  /* user Roles*/
  public getRoles(returnInactive: boolean=false) {
    const url = `${this.envUrl.urlAddress}/api/users/roles`;
    return this.http.get<any>(url, httpOptions);
  }

  /*User departments*/
  public getDepartments(returnInactive: boolean=false) {
    const url = `${this.envUrl.urlAddress}/api/users/departments`;
    return this.http.get<any>(url, httpOptions);
  }
  /* User Controller */
  public getAllUsers() {
    const url = `${this.envUrl.urlAddress}/api/users`;
    return this.http.get<IUser[]>(url, httpOptions);
  }

  public createUser(user) {
    const url = `${this.envUrl.urlAddress}/api/users`;
    return this.http.post<IUser>(url,user, httpOptions);
  }
  
  public updateUser(user) {
    const url = `${this.envUrl.urlAddress}/api/users`;
    return this.http.put<IUser>(url, user, httpOptions);
  }

  /*Search for user*/
  public searchForUser(searchTerm) {
    const url = `${this.envUrl.urlAddress}/api/users/global?searchTerm=${searchTerm}`;
    return this.http.get<any[]>(url, httpOptions);
  }
}
