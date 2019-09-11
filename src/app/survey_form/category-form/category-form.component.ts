import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Issue} from '../../model/issue';
import {Category} from '../../model/category';
import {Question} from '../../model/question';
import {QuestionFormComponent} from '../question-form/question-form.component';
import {SurveyService} from '../../services/survey.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() data: any;
  @ViewChild(QuestionFormComponent)
  questionFormComponent: QuestionFormComponent;
  @Output() submittedData = new EventEmitter<boolean>();

  sections: Issue [] = [];
  formCategories: FormGroup;
  formArrayCategories: FormArray;
  currentSection = 0;
  isTouched = false;
  messageResult = '';

  constructor(private formBuilder: FormBuilder, private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.sections = this.data.questions;
    this.formCategories = this.formBuilder.group({
      group_categories: this.formBuilder.array([this.createCategory()]),
    });
  }

  private createCategory(): FormGroup {
    return this.formBuilder.group({
      category_name: ['', Validators.required],
      category_type: '',
      category_subTitle: '',
      category_rating_scale: '',
    });
  }

  get getCategory() {
    this.formArrayCategories = this.formCategories.get('group_categories') as FormArray;
    return this.formArrayCategories;
  }

  private addCategory() {
    this.isTouched = false;
    this.formArrayCategories.push(this.createCategory());
  }

  private removeCategory(index): void {
    this.formArrayCategories.removeAt(index);
  }

  private getListQuestions(): Question[]  {
    const questions: Question[] = [];
    this.questionFormComponent.formArrayQuestions.controls.forEach( control => {
      questions.push(new Question(null, control.get('question').value, null));
    });
    return questions;
  }

  nextButtonClicked() {
    this.collectData();
    this.currentSection += 1;
    this.ngOnInit();
  }

  submit() {
    this.collectData();
    this.data.questions = this.sections;
    this.surveyService.createSurvey(this.data).subscribe( result => {
      console.log(`Result: ${result}`);
      if (result === true) {
        this.submittedData.emit(result);
        this.messageResult = 'Created a new survey';
      } else {
        this.messageResult = 'You cannot submit a new survey at the moment';
      }
    });
  }

  private collectData() {
    const item = this.sections[this.currentSection];
    this.formArrayCategories.controls.forEach(control => {
      item.categoryQuestion.push(new Category(null, control.get('category_name').value, this.getListQuestions(), null,
        control.get('category_subTitle').value, control.get('category_type').value, control.get('category_rating_scale').value));
    });
  }
}
