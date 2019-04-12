import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    ViewChild,
    NgZone
} from '@angular/core';
import { TestResult } from 'src/app/models/test-result';
import { MatRow } from '@angular/material';
import { Router } from '@angular/router';
import { TestResultService } from 'src/app/services/test-result.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DataTableComponent } from '../data-table/data-table.component';
import sync from 'css-animation-sync';
import { GetRound } from 'src/app/helpers/format-helpers';
import { sortByMeanDesc } from 'src/app/helpers/sort-helpers';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-test-results',
    templateUrl: './test-results.component.html',
    styleUrls: ['./test-results.component.scss'],
})

export class TestResultsComponent implements OnInit, OnDestroy {
    @ViewChild('table') table: DataTableComponent<any>;
    @Input() selectedRow: MatRow;
    selectedResult: TestResult;
    testResults: TestResult[];

    private resultsSubscription: Subscription;
    private testSubscription: Subscription;

    tableSettings: { [k: string]: string };
    formatColumns: any = {};
    data: any[];
    isLoading = true;

    private round = GetRound(2);
    private readonly settings = this.appConfig.settings;

    constructor(private appConfig: AppConfigService,
                private router: Router,
                private testResultService: TestResultService,
                private signalRService: SignalRService,
                private ngZone: NgZone) {
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
        this.formatColumns.meanResponseTime = (val) => `${this.round(val)} ms`;
    }

    ngOnInit() {
        sync('progress');
        this.getResults();
        this.resultsSubscription = this.signalRService.onResultMessage$.pipe(
            map(msg => new TestResult(msg))
        ).subscribe(result => this.ngZone.run(() => {
            this.updateRow(result);
        }));
    }

    ngOnDestroy() {
        this.unsubscribe(this.resultsSubscription);
        this.unsubscribe(this.testSubscription);
    }

    getResults() {
        this.resultsSubscription = this.testResultService.getResults().subscribe(data => {
            this.testResults = data.sort(sortByMeanDesc());
            this.isLoading = false;
        });
    }

    onSelect(row: MatRow): void {
        this.selectedRow = row;
        this.selectedResult = row && new TestResult(row);
    }

    onClickDetails() {
        this.router.navigateByUrl(this.settings.routes.details(this.selectedResult.id));
    }

    onClickRepeat() {
        this.testSubscription = this.testResultService.startTest(this.selectedResult.authority)
                                                      .subscribe(response => {}, error => {});
    }

    updateRow(row: TestResult) {
        const resultIndex = this.testResults.findIndex(x => x.id === row.id);
        if (resultIndex !== -1) {
            this.mapTestResult(row, this.testResults[resultIndex]);
        } else {
            this.prependRow(row);
        }
        if (this.selectedResult && this.selectedResult.id === row.id) {
            this.mapTestResult(row, this.selectedResult);
        }
        this.testResults = this.testResults.concat().sort(sortByMeanDesc());
    }

    prependRow(row: TestResult) {
        this.testResults.unshift(row);
        this.table.renderRows();
    }

    appendRow(row: TestResult) {
        this.testResults.push(row);
        this.table.renderRows();
    }

    private mapTestResult(src: TestResult, dest: TestResult) {
        dest.id = src.id;
        dest.authority = src.authority;
        dest.minResponseTime = src.minResponseTime;
        dest.maxResponseTime = src.maxResponseTime;
        dest.meanResponseTime = src.meanResponseTime;
        dest.testDate = src.testDate;
        dest.status = src.status;
    }

    private unsubscribe(subscription: Subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    }
 }
