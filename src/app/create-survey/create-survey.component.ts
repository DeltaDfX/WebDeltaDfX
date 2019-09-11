import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Issue} from '../model/issue';
import {Category} from '../model/category';
import {Question} from '../model/question';
import {Observable} from 'rxjs';
import {SectionFormComponent} from '../survey_form/section-form/section-form.component';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {
  categories: FormArray;
  title: '';
  pageNum = 1;
  issues: Issue[] = [];
  dataJson;
  endPage = 1;

  @ViewChild(SectionFormComponent) child;

 // categories: Category[] = [new Category(null, '', [], null, '', '', 0)];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  private receivedDataSections(data) {
    this.pageNum += 1;
    this.endPage = data.questions.length + 1;
    this.dataJson = data;
  }
}
