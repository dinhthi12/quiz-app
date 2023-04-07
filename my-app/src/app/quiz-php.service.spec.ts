import { TestBed } from '@angular/core/testing';

import { QuizPhpService } from './service/quiz-php.service';

describe('QuizPhpService', () => {
  let service: QuizPhpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizPhpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
