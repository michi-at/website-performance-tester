import { Injectable } from '@angular/core';
import { TestResult } from '../models/test-result';
import { TEST_RESULTS } from '../models/mock-test-results';
import { BehaviorSubject } from 'rxjs';
import { TestResultDetail } from '../models/test-result-detail';
import { TEST_RESULT_DETAILS } from '../models/mock-test-result-details';

@Injectable({
  providedIn: 'root',
})
export class TestResultService {
  private results$: BehaviorSubject<TestResult[]> = new
  BehaviorSubject<TestResult[]>(TEST_RESULTS);
  private resultDetails$: BehaviorSubject<TestResultDetail[]> = new
  BehaviorSubject<TestResultDetail[]>(TEST_RESULT_DETAILS);

  constructor() { }

  getResults() {
    return this.results$;
  }

  getResultDetails(id: number | string) {
    if (+id === 1) {
        return this.resultDetails$;
    } else {
        return new BehaviorSubject<TestResultDetail[]>([]);
    }
  }
}
