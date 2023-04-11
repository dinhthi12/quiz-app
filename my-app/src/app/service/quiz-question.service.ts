import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizQuestionService {
  //link json
  private _quizJson = 'assets/db/Quizs/QuizAll.json';
  List: any = [];

  constructor(private HttpClient: HttpClient) {}

  //func getAllQuiz
  getAllQuizById(id: string): Observable<any> {
    this.HttpClient.get<any>(this._quizJson).subscribe((data) => {

      this.List = data;
    });

    return this.List;
  }
}
