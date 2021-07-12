import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Airplane } from './airplane'
import { HttpClient } from '@angular/common/http';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class Airplaneservice {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){ }

  public getAirplane(): Observable<Airplane[]>{
    return this.http.get<Airplane[]>(`${this.apiServerUrl}/airplane/all`);
  }

  public addAirplane(airplane: Airplane): Observable<Airplane>{
    return this.http.post<Airplane>(`${this.apiServerUrl}/airplane/add`, airplane);
  }

  public updateAirplane(airplane: Airplane): Observable<Airplane>{
    return this.http.put<Airplane>(`${this.apiServerUrl}/airplane/update`, airplane);
  }

  public deleteAirplane(airplaneId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/airplane/delete/${airplaneId}`);
  }
}
