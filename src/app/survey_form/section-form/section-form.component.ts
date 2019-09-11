import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Issue} from '../../model/issue';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {
  formSectionPart: FormGroup;
  formArraySections: FormArray;
  @Output() finishFormSections = new EventEmitter<any>();


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formSectionPart = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      group_sections: this.formBuilder.array([this.createSection()])
    });
  }

  /*Functionality of Section part*/
  private get getArraySections() {
    this.formArraySections = this.formSectionPart.get('group_sections') as FormArray;
    return this.formArraySections;
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
    const sections = [];
    this.formArraySections.controls.forEach( sectionControl => {
        sections.push(new Issue(null, sectionControl.get('section').value, []));
    });
    const dataJson = {
      title: this.formSectionPart.get('title').value,
      description: this.formSectionPart.get('title').value,
      questions: sections
    };
    this.finishFormSections.emit(dataJson);
  }
}
