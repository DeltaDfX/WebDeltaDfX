import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Survey} from '../../../../model/survey';
import {SurveyService} from '../../../../services/survey.service';
import {EditSurveyComponent} from '../survey_form/edit-survey/edit-survey.component';
import {ConfirmationDialogComponent} from '../../../../modal-views/dialog/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-survey-main-page',
  templateUrl: './survey-main-page.component.html',
  styleUrls: ['./survey-main-page.component.scss']
})
export class SurveyMainPageComponent implements OnInit {
  listSurveys: Survey[] = [];
  title = 'Survey';
  editingSectionShowing = false;
  survey: Survey;
  @ViewChild('editSurveyForm', {static: false, read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private surveyService: SurveyService, private componentFactoryResolver: ComponentFactoryResolver, private dialog: MatDialog) { }

  ngOnInit() {
    this.surveyService.getSurveys().subscribe( surveys => {
      this.listSurveys = surveys;
    });
  }

  editSurvey(survey: Survey) {
    this.survey = survey;
    this.showEditSurvey();
  }

  addEditSurveyForm() {
    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EditSurveyComponent);
    // add the component to the view
    const componentRef = this.container.createComponent(componentFactory);
    componentRef.instance.dataInput = this.survey;
    componentRef.instance.cancelForm.subscribe(() => this.removeEditSurveyForm());
  }

  removeEditSurveyForm() {
    this.container.remove(1);
  }

  deleteSurvey(survey: Survey) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.surveyService.deleteSurvey(survey).subscribe( response => {
          if (response) {
            this.listSurveys.slice(this.listSurveys.indexOf(survey), 1);
            this.ngOnInit();
          } else {
            alert(`This survey can't delete at the moment`);
          }
        });
      }
    });
  }

  showEditSurvey() {
    if (this.editingSectionShowing === false) {
      this.editingSectionShowing = true;
      this.addEditSurveyForm();
    } else {
      this.removeEditSurveyForm();
      this.addEditSurveyForm();
    }
  }

  addNewSurvey() {
    this.survey = null;
    this.showEditSurvey();
  }
}
