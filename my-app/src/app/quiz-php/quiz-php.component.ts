import { ActivatedRoute } from '@angular/router';
import { QuizPhpService } from '../service/quiz-php.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-quiz-php',
  templateUrl: './quiz-php.component.html',
  styleUrls: ['./quiz-php.component.scss'],
})
export class QuizPhpComponent implements OnInit {
  quizList: any = [];
  public name: string = '';
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;
  isEmptyQuiz: boolean = false;
  constructor(
    private QuizPhpService: QuizPhpService,
    private ActivatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}
  private _quizPhpJson = 'assets/db/Quizs/QuizAll.json';
  ngOnInit(): void {
    this.httpClient.get<any>(this._quizPhpJson).subscribe((data: any) => {
      for (let element of data) {
        if (element.idSubjects == this.ActivatedRoute.snapshot.params['id']) {
          this.quizList = element.questions;
          this.isEmptyQuiz = true;
        }
      }
      if (this.isEmptyQuiz == false) {
        console.log('danh sách rỗng');
      }
    });
    // this.name = localStorage.getItem('name')!;

    //console.log(this.ActivatedRoute.snapshot.params['id']);
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    console.log(this.QuizPhpService.getAllQuizsByidSubject(this.ActivatedRoute.snapshot.params['id']));
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  prevQuestion() {
    this.currentQuestion--;
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

  startCounter() {
    this.interval$ = interval(1000).subscribe(() => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = '0';
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.quizList.length) * 100)
      .toFixed(0)
      .toString();

    return this.progress;
  }
}
