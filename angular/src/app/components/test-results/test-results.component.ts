import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TestResult } from 'src/app/models/test-result';
import { MatRow } from '@angular/material';
import { Router } from '@angular/router';
import { TestResultService } from 'src/app/services/test-result.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
    selector: 'app-test-results',
    templateUrl: './test-results.component.html',
    styleUrls: ['./test-results.component.scss']
})

export class TestResultsComponent implements OnInit, OnDestroy {
    @Input() selectedRow: MatRow;
    selectedResult: TestResult;

    testResults: TestResult[];
    resultsSubscription: Subscription;

    tableSettings: { [k: string]: string };
    formatColumns: any = {};
    data: any[];

    private readonly settings = this.appConfig.settings;

    constructor(private appConfig: AppConfigService,
                private router: Router,
                private testResultService: TestResultService,
                private signalRService: SignalRService) {
        this.tableSettings = {
            id: 'Id',
            authority: 'Authority',
            minResponseTime: 'Min. response time',
            maxResponseTime: 'Max. response time',
            meanResponseTime: 'Mean response time',
            testDate: 'Date',
            status: 'Status',
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

    ngOnDestroy() {
        this.resultsSubscription.unsubscribe();
    }

    getResults() {
        this.resultsSubscription = this.testResultService.getResults().subscribe(data => {
            this.testResults = data;
        });
    }

    onSelect(row: MatRow): void {
        this.selectedRow = row;
        this.selectedResult = row && new TestResult(row);
    }

    onClickDetails() {
        this.router.navigateByUrl(this.settings.routes.details(this.selectedResult.id));
    }
 }
