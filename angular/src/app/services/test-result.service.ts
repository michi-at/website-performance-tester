import { Injectable } from '@angular/core';
import { TestResult } from '../models/test-result';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { TestResultDetail } from '../models/test-result-detail';
import { AppConfigService } from './app-config.service';
import { JSON_TYPE } from '../helpers/content-types';

@Injectable({
  providedIn: 'root',
})
export class TestResultService {
  private results$: Observable<TestResult[]>;
  private readonly settings = this.appConfig.settings;

  constructor(private appConfig: AppConfigService) {
    this.results$ = ajax.getJSON<TestResult[]>(this.settings.apiResultsPath).pipe(
      map(response => response.map(data => new TestResult(data))
      )
    );
  }

  getResults() {
    return this.results$;
  }

  getResultDetails(id: number | string) {
    return ajax.getJSON<TestResultDetail[]>(this.settings.apiDetails(id)).pipe(
      map(response => response.map(data => new TestResultDetail(data))
      )
    );
  }

  startTest(uri: string) {
    return ajax.post(this.settings.apiResultsPath, JSON.stringify(uri), JSON_TYPE);
  }
}
