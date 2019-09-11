import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  formQuestion: FormGroup;
  formArrayQuestions: FormArray;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formQuestion = this.formBuilder.group({
      formArrayQuestions: this.formBuilder.array([this.createQuestion()])
    });
  }

  private createQuestion() {
    return this.formBuilder.group({
      question: ['', Validators.required]
    });
  }

  private get getQuestions() {
    this.formArrayQuestions = this.formQuestion.get('formArrayQuestions') as FormArray;
    return this.formArrayQuestions;
  }

  private addQuestion() {
    this.formArrayQuestions.push(this.createQuestion());
  }

  private removeQuestion(index) {
    this.formArrayQuestions.removeAt(index);
  }
}
