import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../../../model/category';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  formArrayQuestions: FormArray;
  question = '';
  @Input() categoryQuestion: Category;
  @Input() parentForm: FormGroup;
  formQuestions: FormGroup;
  @Input() categoryIndex: number;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const arrayGroupCategories = this.parentForm.get('group_categories') as FormGroup;
    const groupCategory = arrayGroupCategories.controls[this.categoryIndex] as FormGroup;
    this.formQuestions = groupCategory.get('formQuestions') as FormGroup;
    if (this.categoryQuestion !== null && this.categoryQuestion !== undefined) {
      this.formQuestions.addControl('formArrayQuestions', this.loadQuestions());
    } else {
      this.formQuestions.addControl('formArrayQuestions', this.formBuilder.array([this.createQuestion()]));
    }
  }

  private loadQuestions(): FormArray {
    const formArray = this.formBuilder.array([]);
    this.categoryQuestion.questions.forEach( question => {
      formArray.push(this.createQuestionWithData(question.question));
    });
    return formArray;
  }

  private createQuestionWithData(question: string): FormGroup {
    return this.formBuilder.group({
      question: [question, Validators.required]
    });
  }

  private createQuestion(): FormGroup {
    return this.formBuilder.group({
      question: ['', Validators.required]
    });
  }

  get getQuestions() {
    this.formArrayQuestions = this.formQuestions.get('formArrayQuestions') as FormArray;
    return this.formArrayQuestions;
  }

  private addQuestion() {
    this.formArrayQuestions.push(this.createQuestion());
  }

  private removeQuestion(index) {
    this.formArrayQuestions.removeAt(index);
  }
}
