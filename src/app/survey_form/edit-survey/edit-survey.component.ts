import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray} from '@angular/forms';
import {Issue} from '../../model/issue';
import {Survey} from '../../model/survey';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit {
  categories: FormArray;
  @Input() title: '';
  pageNum = 1;
  issues: Issue[] = [];
  data;
  endPage = 1;
  @Input() dataInput: Survey;
  @Output() cancelForm = new EventEmitter();
  isUpdate = false;

  ngOnInit() {
    if (this.dataInput !== null && this.dataInput !== undefined) {
      this.isUpdate = true;
    }
  }

  private receivedDataSections(data) {
    this.pageNum += 1;
    this.endPage = data.issues.length + 1;
    this.dataInput = data;
  }

  goBackClicked() {
    this.pageNum -= 1;
  }

  cancelFormClicked(event) {
    this.cancelForm.emit();
  }
}
