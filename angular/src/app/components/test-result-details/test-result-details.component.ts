import {
    Component,
    OnInit,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestResultDetail } from 'src/app/models/test-result-detail';
import { Location } from '@angular/common';
import { GoogleChartComponent } from 'angular-google-charts';
import { SignalRService } from 'src/app/services/signalr.service';
import { Subscription } from 'rxjs';
import { GetRound } from 'src/app/helpers/format-helpers';
import { sortByMeanDesc } from 'src/app/helpers/sort-helpers';

@Component({
    selector: 'app-test-result-details',
    templateUrl: './test-result-details.component.html',
    styleUrls: ['./test-result-details.component.scss']
})
export class TestResultDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('chart') chart: GoogleChartComponent;

    resultDetails: TestResultDetail[];
    private resultDetailsSubscription: Subscription;
    data: any[];
    chartOptions: any = {
        title: 'Pages performance',
        chartArea: {
            width: '60%',
            top: '0',
            height: '100%',

        },
        colors: [
            '#C5CAE9',
            '#9FA8DA',
            '#7986CB'
        ],
    };
    columnNames: string[];
    tableSettings: { [k: string]: string };
    formatColumns: any = {};
    isLoading = true;

    private round = GetRound(2);
    private formatUri = (val) => `<div class="truncate"><span class="truncated">${val}</span></div>`;

    constructor(private activeRoute: ActivatedRoute,
                private location: Location,
                private signalRService: SignalRService) {
        this.tableSettings = {
            id: 'Id',
            uri: 'Uri',
            responseTime: 'Response time',
            minResponseTime: 'Min. response time',
            maxResponseTime: 'Max. response time',
            meanResponseTime: 'Mean response time'
        };
        this.formatColumns.responseTime =
            this.formatColumns.minResponseTime =
            this.formatColumns.maxResponseTime =
            this.formatColumns.meanResponseTime = (val) => `${this.round(val)} ms`;
        this.formatColumns.uri = this.formatUri;
    }

    ngOnInit() {
        this.resultDetailsSubscription = this.activeRoute.data.subscribe((data: { details: TestResultDetail[] }) => {
            this.resultDetails = data.details.sort(sortByMeanDesc());
            this.isLoading = false;
            this.initChartData();
        });
    }

    ngOnDestroy() {
        this.unsubscribe(this.resultDetailsSubscription);
    }

    initChartData() {
        this.data = this.resultDetails.reduce((acc, el) =>
            acc.concat([
                        [
                            el.uri,
                            el.minResponseTime,
                            el.meanResponseTime,
                            el.maxResponseTime
                        ]
                       ]), []);
        this.columnNames = ['Uri', 'Min.', 'Mean', 'Max.'];
        if (this.data.length > 1) {
            this.chartOptions.height = this.data.length * 51;
        }
    }

    goBack() {
        this.location.back();
    }

    private unsubscribe(subscription: Subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    }
}
