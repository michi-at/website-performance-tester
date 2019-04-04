import { Component, OnInit } from '@angular/core';
import { TEST_RESULTS } from 'src/app/models/mock-test-results';
import { TestResult } from 'src/app/models/test-result';
import { MatRowDef, MatRow } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-test-results',
    templateUrl: './test-results.component.html',
    styleUrls: ['./test-results.component.scss']
})

export class TestResultsComponent implements OnInit {

    testResults = TEST_RESULTS;
    selectedResult: TestResult;

    displayedColumns: string[] = ['testResultId', 'authority', 'minResponseTime', 'maxResponseTime', 'meanResponseTime',
        'testDate'];

    constructor(private router: Router) { }

    ngOnInit() {
    }

    onSelect(result: MatRow): void {
        this.selectedResult = new TestResult(result);
        //this.router.navigate(['/details', this.selectedResult.testResultId]);
    }
}
