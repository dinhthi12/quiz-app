import { QuizQuestionService } from './../service/quiz-question.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss'],
})
export class QuizQuestionComponent implements OnInit {
  quizList: any = []; //list
  counter = 60; //time
  interval$: any;
  public currentQuestion: number = 0;
  isQuizCompleted: boolean = false;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  public points: number = 0;
  //isEmptyQuiz: boolean = false;
  private _quizJson = 'assets/db/Quizs/QuizAll.json';

  constructor(
    private HttpClient: HttpClient,
    private ActivatedRoute: ActivatedRoute,
    private QuizQuestionService: QuizQuestionService
  ) {}

  ngOnInit(): void {
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    //get data from database
    this.HttpClient.get<any>(this._quizJson).subscribe((data: any) => {
      //for data
      for (let element of data) {
        //if id(url) = id(database)
        if (element.idSubjects == this.ActivatedRoute.snapshot.params['id']) {
          //list = data.question
          this.quizList = element.questions;
          console.log(this.quizList);
          //this.isEmptyQuiz = true;
        }
      }
    });
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe(() => {
      this.counter--;
      //if counter == 0 => back
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
      }
    });

    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  answer(currentQno: number, option: any) {
    if (currentQno === this.quizList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        // this.getProgressPercent();
      }, 1000);
    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.incorrectAnswer++;
        // this.getProgressPercent();
      }, 1000);
      this.points -= 0;
    }
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  nextQuestions() {
    this.currentQuestion++;
  }

  prevQuestions() {
    this.currentQuestion--;
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
}
