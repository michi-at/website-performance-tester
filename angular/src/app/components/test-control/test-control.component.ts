import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RE_WEBURL, uriValidator } from 'src/app/helpers/uri.validator';
import { TestResultService } from 'src/app/services/test-result.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-test-control',
    templateUrl: './test-control.component.html',
    styleUrls: ['./test-control.component.scss']
})
export class TestControlComponent implements OnInit, OnDestroy {
    protocol = 'https://';
    uri: string;
    uriValidator = new FormControl('', [Validators.required, uriValidator(RE_WEBURL)]);

    private ajaxPostSubscription: Subscription;

    constructor(private testResultService: TestResultService) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.ajaxPostSubscription) {
            this.ajaxPostSubscription.unsubscribe();
        }
    }

    submit() {
        if (this.uriValidator.valid) {
            this.ajaxPostSubscription = this.testResultService.startTest(this.getUri())
                                                              .subscribe(response => {},
                                                                         error => {});
        }
    }

    getUri() {
        return `${this.protocol}${this.uriValidator.value}`;
    }

    getErrorMessage() {
        return this.uriValidator.hasError('required') ? 'You must enter a value' :
            this.uriValidator.hasError('invalidUri') ? 'Not a valid uri' :
                '';
    }
}
