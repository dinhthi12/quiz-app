import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPhpComponent } from './quiz-php.component';

describe('QuizPhpComponent', () => {
  let component: QuizPhpComponent;
  let fixture: ComponentFixture<QuizPhpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizPhpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizPhpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
