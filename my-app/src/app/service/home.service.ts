import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _homeJson = 'assets/db/Subjects.json';

  constructor(private HttpClient: HttpClient) { }

  getAllHome(): Observable<any> {
    return this.HttpClient.get<any>(this._homeJson);
  }
}
