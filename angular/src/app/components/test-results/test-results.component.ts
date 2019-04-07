import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestResult } from 'src/app/models/test-result';
import { MatRow } from '@angular/material';
import { Router } from '@angular/router';
import { TestResultService } from 'src/app/services/test-result.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-test-results',
    templateUrl: './test-results.component.html',
    styleUrls: ['./test-results.component.scss']
})

export class TestResultsComponent implements OnInit {
    selectedResult: TestResult;
    testResults: TestResult[];

    settings: { [k: string]: string };
    formatColumns: any = {};
    public data: any[];

    constructor(private router: Router,
                private testResultService: TestResultService,
                private signalRService: SignalRService) {
        this.settings = {
            id: 'Id',
            authority: 'Authority',
            minResponseTime: 'Min. response time',
            maxResponseTime: 'Max. response time',
            meanResponseTime: 'Mean response time',
            testDate: 'Date',
            status: 'Status'
        };
        this.formatColumns.status = (val) => {
            let icon = '';
            switch (+val) {
                case 0: {
                    icon = 'done';
                    break;
                }
                case 1: {
                    icon = 'hourglass_empty';
                    break;
                }
                default: {
                    icon = val;
                    break;
                }
            }
            return `<i class="material-icons ${icon}">${icon}</i>`;
        };
        this.formatColumns.testDate = (date) => date.toLocaleString();
        this.formatColumns.minResponseTime =
        this.formatColumns.maxResponseTime =
        this.formatColumns.meanResponseTime = (val) => `${val} ms`;
    }

    ngOnInit() {
        this.getResults();
    }

    getResults() {
        this.testResultService.getResults()
                              .subscribe(results => this.testResults = results);
    }

    onSelect(result: MatRow): void {
        this.selectedResult = new TestResult(result);
        this.router.navigate(['/details', this.selectedResult.id]);
    }
}
