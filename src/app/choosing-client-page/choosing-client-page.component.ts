import {Component, OnInit} from '@angular/core';
import { Survey} from '../Model/survey';
import {GroupStakeholder} from '../Model/group-stakeholder';
import {Router} from '@angular/router';

@Component({
    selector: 'app-choosing-client-page',
    templateUrl: './choosing-client-page.component.html',
    styleUrls: ['./choosing-client-page.component.scss']
})
export class ChoosingClientPageComponent implements OnInit {

    surveys: Array<Survey>;
    survey: Survey;
    stakeholders: Array<GroupStakeholder>;
    stakeholder: GroupStakeholder;

    constructor(private router: Router) {}

    ngOnInit() {
        this.surveys = [new Survey(1, 'Survey 1'),
            new Survey(1, 'Survey 2'),
            new Survey(1, 'Survey 3')];
        this.stakeholders = [
            new GroupStakeholder(1, 'Community'),
            new GroupStakeholder(2, 'Government'),
            new GroupStakeholder(3, 'Supply Chain partners'),
            new GroupStakeholder(4, 'Business partners'),
            new GroupStakeholder(5, 'Employees'),
            new GroupStakeholder(6, 'Executive/Management'),
            new GroupStakeholder(7, 'Indigenous groups'),
            new GroupStakeholder(8, 'Everyone')
        ];
    }

    sendButtonClicked() {
        this.router.navigate(['/content']);
    }
}
