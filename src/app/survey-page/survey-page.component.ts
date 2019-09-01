import {Component, OnInit} from '@angular/core';
import {NavbarService} from '../services/navbar.service';
import {ActivatedRoute} from '@angular/router';
import {SurveyService} from '../services/survey.service';
import {SurveyDetails} from '../model/survey-details';
import {Category} from '../model/category';
import {Question} from '../model/question';
import {Form, FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {group} from '@angular/animations';
import {Issue} from '../model/issue';
import {count} from 'rxjs/operators';
import {removeSummaryDuplicates} from '@angular/compiler';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-survey-page',
    templateUrl: './survey-page.component.html',
    styleUrls: ['./survey-page.component.scss']
})
export class SurveyPageComponent implements OnInit {
    token: string;
    jsonData: any;
    surveyDetail: SurveyDetails;
    remainingPercentage = 0;
    showQuestionDetails: boolean;
    disableNextButton: boolean;
    disableSubmitButton: boolean;
    countItem = 0;
    receiverID: number;
    senderID: number;
    finished = false;

    constructor(private nav: NavbarService, private route: ActivatedRoute, private surveyService: SurveyService,
                private spinner: NgxSpinnerService) {}

    ngOnInit() {
        this.nav.hide();
        this.token = this.route.snapshot.paramMap.get('token');
        this.decodeURLBase64();
        this.disableNextButton = true;
        this.disableSubmitButton = true;
        this.spinner.show();
    }

    decodeURLBase64() {
        const jsonString = atob(this.token);
        this.jsonData = JSON.parse(jsonString);
        this.receiverID = this.jsonData.receiver;
        this.senderID = this.jsonData.sender;
        this.surveyService.getSurvey(this.jsonData.id, this.jsonData.companyName).subscribe(data => {
            this.surveyDetail = data;
            console.log(data);
            this.showQuestionDetails = true;
            this.surveyDetail.issues.forEach( issue => {
                this.countItem += issue.categoryQuestion.length;
            });
        });
    }

    clickedRatingCategory(category: Category, rating: number) {
        if (category.rating == null || category.rating === 0) {
            this.remainingPercentage += (100 / this.countItem) / 100;
        }
        category.rating = rating;
        if (this.validateCategory()) {
            this.disableNextButton = false;
        }
        console.log(category);
    }

    clickedRatingQuestion(question: Question, rating: number) {
        question.rating = rating;
        if (this.validateQuestion()) {
            this.disableSubmitButton = false;
        }
        console.log(question);
    }

    nextToImportantSections() {
        this.showQuestionDetails = true;
        window.scrollTo(0, 0);
        console.log(this.surveyDetail.issues);
    }

    validateCategory(): boolean {
        const issue: Issue[] = this.surveyDetail.issues;
        let isValid: boolean;
        issue.forEach(item => {
            const filteredCategory = item.categoryQuestion.filter(x => x.rating === 0 || x.rating == null);
            if (filteredCategory.length > 0) {
                isValid = false;
            } else {
                isValid = true;
            }
        });
        return isValid;
    }

    validateQuestion(): boolean {
        let isValid: boolean;
        this.surveyDetail.issues.forEach(itemIssue => {
            itemIssue.categoryQuestion.forEach( category => {
                const filteredList = category.questions.filter( q => q.rating === 0 || q.rating == null);
                if (filteredList.length > 0) {
                    isValid = false;
                } else {
                    isValid = true;
                }
            });
        });
        return isValid;
    }

    finishSurvey() {
        this.surveyService.sendSurveyResult(this.surveyDetail, this.receiverID, this.senderID).subscribe( result => {
            if (result) {
                this.finished = true;
                alert('Survey has been sent');
            } else { alert('Can not send this survey. The server has some problems'); }
        });
    }
}
