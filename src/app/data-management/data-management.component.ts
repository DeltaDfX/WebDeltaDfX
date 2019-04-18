import {Component, OnInit} from '@angular/core';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

declare var require: any;

const countryList = require('country-list');

@Component({
    selector: 'app-data-management',
    templateUrl: './data-management.component.html',
    styleUrls: ['./data-management.component.css']
})

@Injectable()
export class DataManagementComponent implements OnInit {
    listCountries: Array<string>;

    constructor(private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        this.listCountries = countryList.getNames();
    }

    submitButtonClicked() {
        this.router.navigate(['/choosing-client']);
    }
}
