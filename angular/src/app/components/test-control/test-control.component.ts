import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RE_WEBURL, uriValidator } from 'src/app/helpers/uri.validator';

@Component({
    selector: 'app-test-control',
    templateUrl: './test-control.component.html',
    styleUrls: ['./test-control.component.scss']
})
export class TestControlComponent implements OnInit {
    protocol = 'https://';
    uri: string;
    uriValidator = new FormControl('', [Validators.required, uriValidator(RE_WEBURL)]);

    constructor() { }

    ngOnInit() {
    }

    submit() {
        console.log(this.getUri());
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