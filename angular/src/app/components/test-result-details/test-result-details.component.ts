import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestResultDetail } from 'src/app/models/test-result-detail';
import { Location } from '@angular/common';
import { GoogleChartComponent } from 'angular-google-charts';
import { SignalRService } from 'src/app/services/signalr.service';
import { Subscription } from 'rxjs';

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
        chart: { title: 'Pages performance' },
        stacked: true,
        bars: 'horizontal',
    };
    columnNames: string[];
    tableSettings: { [k: string]: string };
    formatColumns: any = {};

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
            this.formatColumns.meanResponseTime = (val) => `${val} ms`;
    }

    ngOnInit() {
        this.resultDetailsSubscription = this.activeRoute.data.subscribe((data: { details: TestResultDetail[] }) => {
            this.resultDetails = data.details;
            this.initChartData();
        });
    }

    ngOnDestroy() {
        this.resultDetailsSubscription.unsubscribe();
    }

    initChartData() {
        this.data = this.resultDetails.reduce((acc, el) =>
            acc.concat([[el.uri, el.minResponseTime, el.meanResponseTime, el.maxResponseTime]]), []);
        this.columnNames = ['Uri', 'Min.', 'Mean', 'Max.'];
        this.chartOptions.height = this.data.length * 41;
    }

    goBack() {
        this.location.back();
    }
}
