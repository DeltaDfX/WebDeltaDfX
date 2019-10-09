import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Issue} from '../../../../../model/issue';
import {Category} from '../../../../../model/category';
import {Question} from '../../../../../model/question';
import {QuestionFormComponent} from '../question-form/question-form.component';
import {SurveyService} from '../../../../../services/survey.service';
import {Router} from '@angular/router';
import {Survey} from '../../../../../model/survey';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() data: Survey;
  @ViewChild(QuestionFormComponent, {static: false}) questionFormComponent: QuestionFormComponent;
  @Output() submittedData = new EventEmitter<boolean>();
  @Output() cancelForm = new EventEmitter();
  @Output() goBackForm = new EventEmitter();
  @Input() isUpdate;
  sections: Issue [] = [];
  formCategories: FormGroup;
  formArrayCategories: FormArray;
  currentSection = 0;
  isTouched = false;
  messageResult = '';

  constructor(private formBuilder: FormBuilder, private surveyService: SurveyService, private route: Router) {
  }

  ngOnInit() {
    this.sections = this.data.issues;
    console.log(this.currentSection);
    if (this.isUpdate) {
      this.formCategories = this.formBuilder.group({
        group_categories: this.loadCategory()
      });
    } else {
      this.formCategories = this.formBuilder.group({
        group_categories: this.formBuilder.array([this.createCategory()])
      });
    }
  }

  private loadCategory(): FormArray {
    /*Updating data - Otherwise, creating a new one */
    const section = this.sections[this.currentSection] as Issue;
    return this.formBuilder.array(section.categoryQuestion.map(category => {
        return this.createCategoryWithTitle(category);
      }));
  }

  private createCategoryWithTitle(category: Category): FormGroup {
    return this.formBuilder.group({
      category_name: [category.title, Validators.required],
      category_type: category.type,
      category_subTitle: category.subtitle,
      category_rating_scale: category.typeValue,
      formQuestions: this.formBuilder.group([])
    });
  }

  private createCategory(): FormGroup {
    return this.formBuilder.group({
      category_name: ['', Validators.required],
      category_type: '',
      category_subTitle: '',
      category_rating_scale: '',
      formQuestions: this.formBuilder.group([])
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

  private getListQuestions(): Question[] {
    const questions: Question[] = [];
    this.questionFormComponent.getQuestions.controls.forEach(control => {
      questions.push(new Question(null, control.get('question').value, null));
    });
    return questions;
  }

  nextButtonClicked() {
    this.collectData();
    this.currentSection += 1;
    this.ngOnInit();
  }

  submitButtonClicked() {
    this.collectData();
    this.data.issues = this.sections;
    this.surveyService.updateSurvey(this.data).subscribe(result => {
      console.log(`Result: ${result}`);
      if (result === true) {
        this.submittedData.emit(result);
        this.messageResult = 'Updated a survey';
        window.location.reload();
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

  cancelFormCicked() {
    this.cancelForm.emit();
  }

  goBackFormCicked() {
    this.goBackForm.emit();
  }
}
