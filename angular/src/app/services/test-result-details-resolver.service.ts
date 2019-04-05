import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { TestResultService } from './test-result.service';
import { TestResultDetail } from '../models/test-result-detail';

@Injectable({
  providedIn: 'root',
})
export class TestResultDetailsResolverService implements Resolve<TestResultDetail[]> {
  constructor(private trs: TestResultService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TestResultDetail[]>
                                                                      | Observable<never> {
    const id = route.paramMap.get('id');
    return this.trs.getResultDetails(id).pipe(
      take(1),
      mergeMap(details => {
        if (!details || details.length === 0) { // id not found
          this.router.navigate(['/']);
          return EMPTY;
        } else {
            return of(details);
        }
      })
    );
  }
}
