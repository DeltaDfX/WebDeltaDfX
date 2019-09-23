import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Issue} from '../../model/issue';
import {Survey} from '../../model/survey';
import {count} from 'rxjs/operators';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {
  formSectionPart: FormGroup;
  formArraySections: FormArray;
  @Output() finishFormSections = new EventEmitter<any>();
  @Input() data: Survey;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    if (this.data != null) {
      this.formSectionPart = this.formBuilder.group({
        title: [this.data.title, Validators.required],
        description: [this.data.description, Validators.required],
        group_sections: this.loadSection(this.data.issues)
      });
    } else {
      this.formSectionPart = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        group_sections: this.formBuilder.array([this.createSection()])
      });
    }
  }

  /*Functionality of Section part*/
  get getArraySections() {
    this.formArraySections = this.formSectionPart.get('group_sections') as FormArray;
    return this.formArraySections;
  }

  private loadSection(sections: Issue[]): FormArray {
    let formArray: FormArray = null;
    formArray = this.formBuilder.array(sections.map(section => {
      const sectionTitle = section === null ? '' : section.issue;
      return this.createSectionWithTitle(sectionTitle);
    }));
    return formArray;
  }

  private createSectionWithTitle(title: string): FormGroup {
    return this.formBuilder.group({
      section: [title, Validators.required]
    });
  }

  private createSection(): FormGroup {
    return this.formBuilder.group({
      section: ['', Validators.required]
    });
  }

  private addSection(): void {
    this.formArraySections.push(this.createSection());
  }

  private removeSection(index): void {
    this.formArraySections.removeAt(index);
  }

  nextStepClicked() {
    const sections: Issue[] = [];
    if (this.data !== null) {
      this.formArraySections.controls.forEach((sectionControl, index) => {
        if (this.data.issues[index] !== null && this.data.issues[index] !== undefined) {
          console.log(this.data.issues[index]);
          const issue = this.data.issues[index];
          issue.issue = sectionControl.get('section').value;
          sections.push(issue);
        } else {
          sections.push(new Issue(null, sectionControl.get('section').value, []));
        }
      });
      this.data.title = this.formSectionPart.get('title').value;
      this.data.description = this.formSectionPart.get('description').value;
      this.data.issues = sections;
      this.finishFormSections.emit(this.data);
    } else {
      this.formArraySections.controls.forEach((sectionControl, index) => {
        sections.push(new Issue(null, sectionControl.get('section').value, []));
      });
      const dataJson = {
        title: this.formSectionPart.get('title').value,
        description: this.formSectionPart.get('description').value,
        issues: sections
      };
      this.finishFormSections.emit(dataJson);
    }
  }
}
