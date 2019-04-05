import { Component, OnInit } from '@angular/core';
import { TestResult } from 'src/app/models/test-result';
import { MatRow } from '@angular/material';
import { Router } from '@angular/router';
import { TestResultService } from 'src/app/services/test-result.service';

@Component({
    selector: 'app-test-results',
    templateUrl: './test-results.component.html',
    styleUrls: ['./test-results.component.scss']
})

export class TestResultsComponent implements OnInit {
    selectedResult: TestResult;
    testResults: TestResult[];

    public settings: { [k: string]: string };
    public data: any[];

    constructor(private router: Router, private testResultService: TestResultService) {
        this.settings = {
            testResultId: 'Id',
            authority: 'Authority',
            minResponseTime: 'Min. response time',
            maxResponseTime: 'Max. response time',
            meanResponseTime: 'Mean response time',
            testDate: 'Date'
        };
    }

    ngOnInit() {
        this.getResults();
        this.data = this.testResults.map(element => {
            const { testDate, ...rest }: any = element;
            rest.testDate = testDate.toLocaleString();
            return rest;
        });
    }

    getResults() {
        this.testResultService.getResults()
                              .subscribe(results => this.testResults = results);
    }

    onSelect(result: MatRow): void {
        this.selectedResult = new TestResult(result);
        this.router.navigate(['/details', this.selectedResult.testResultId]);
    }
}
