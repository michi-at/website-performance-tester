import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestResultDetail } from 'src/app/models/test-result-detail';
import { TestResultService } from 'src/app/services/test-result.service';
import { Location } from '@angular/common';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
    selector: 'app-test-result-details',
    templateUrl: './test-result-details.component.html',
    styleUrls: ['./test-result-details.component.scss']
})
export class TestResultDetailsComponent implements OnInit {
    @ViewChild('chart') chart: GoogleChartComponent;

    testResultDetails: TestResultDetail[];
    data: any[];
    chartOptions: any = { chart: { title: 'Pages performance' }, stacked: true, bars: 'horizontal' };
    columnNames: string[];
    public settings: { [k: string]: string };

    constructor(private router: Router,
                private activeRoute: ActivatedRoute,
                private testResultService: TestResultService,
                private location: Location) {
        this.settings = {
            testResultDetailId: 'Id',
            uri: 'Uri',
            responseTime: 'Response time',
            minResponseTime: 'Min. response time',
            maxResponseTime: 'Max. response time',
            meanResponseTime: 'Mean response time'
        };
    }

    ngOnInit() {
        this.activeRoute.data.subscribe((data: { details: TestResultDetail[] }) => {
            this.testResultDetails = data.details;
            this.initChartData();
        });
    }

    initChartData() {
        this.data = this.testResultDetails.reduce((acc, el) =>
            acc.concat([[el.uri, el.minResponseTime, el.meanResponseTime, el.maxResponseTime]]), []);
        this.columnNames = ['Uri', 'Min.', 'Mean', 'Max.'];
        this.chartOptions.height = this.data.length * 41;
    }

    goBack() {
        this.location.back();
    }
}
