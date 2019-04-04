import { Component, OnInit } from '@angular/core';
import { TEST_RESULT_DETAILS } from 'src/app/models/mock-test-result-details';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-test-result-details',
    templateUrl: './test-result-details.component.html',
    styleUrls: ['./test-result-details.component.scss']
})

export class TestResultDetailsComponent implements OnInit {

    testResultDetails = TEST_RESULT_DETAILS;

    constructor(private router: Router, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        const routeParams = this.activeRoute.snapshot.params;
        if (parseInt(routeParams.id, 10) !== 1) {
            this.router.navigate(['/']);
        }
    }
}
