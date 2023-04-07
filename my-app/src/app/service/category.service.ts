import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categoryJson = 'assets/db/Subjects.json';

  constructor(private HttpClient:HttpClient) { }

  getAllCategory(): Observable<any> {
    return this.HttpClient.get<any>(this._categoryJson);
  }
}
