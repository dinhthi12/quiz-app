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

   map =new Map();
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
      //if counter == 0 => end quiz
      if (this.counter === 0) {
        this.isQuizCompleted = true;
        this.stopCounter();
      }
    });

    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  answer(currentQno: number, option: any,index :number) {
    //nếu số câu hỏi = tổng số lượng câu hỏi thì end
    // if (currentQno === this.quizList.length) {
    //   this.isQuizCompleted = true;
    //   this.stopCounter();
    // }
    this.map.set(currentQno, index);
    console.log(this.map);

    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;

      //lúc click sẽ tự chuyển đến câu tiếp theo
      // setTimeout(() => {
      //   if (currentQno === this.quizList.length) {
      //     this.currentQuestion--;
      //   }
      //   if (this.currentQuestion < this.quizList.length) {
      //     this.currentQuestion++;
      //   }
      //   //this.resetCounter();
      //   // this.getProgressPercent();
      // }, 1000);
    } else {
      // setTimeout(() => {
      //   if (currentQno === this.quizList.length) {
      //     this.currentQuestion--;
      //   }
      //   if (this.currentQuestion < this.quizList.length) {
      //     this.currentQuestion++;
      //   }
        //this.resetCounter();


        // this.getProgressPercent();
      // }, 1000);
      //this.incorrectAnswer++;
      this.incorrectAnswer = this.quizList.length - this.correctAnswer;
      this.points -= 0;
    }
  }

  endQuiz() {
    this.isQuizCompleted = true;
    this.stopCounter();
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
