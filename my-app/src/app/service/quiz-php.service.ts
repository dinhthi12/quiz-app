import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizPhpService {
  private _quizPhpJson = 'assets/db/Quizs/PHPP.json';

  constructor(private httpClient: HttpClient) {}

  List: any = [];

  getAllQuizsByidSubject(id: string): Observable<any> {
    this.httpClient.get<any>(this._quizPhpJson).subscribe((data) => {
      //console.log(data);
      this.List = data;
    });

    return this.List;
  }
}
