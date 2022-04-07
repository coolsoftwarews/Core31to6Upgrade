import { Injectable, Inject } from '@angular/core';
import { Observable, Operator } from 'rxjs';
import { HttpBackend, HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class GeoService {



  constructor(private http: HttpClient, handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  public getGeoAddress(address: string): Observable<any> {
    return this.http.get<any>(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=` + address + `&f=pjson&sourceCountry=ZAF&maxLocations=10`);
  }
}
