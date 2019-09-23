import { Component, OnInit } from '@angular/core';
import {GroupStakeholder} from '../../model/group-stakeholder';
import {StakeholderService} from '../../services/stakeholder.service';
import {Stakeholder} from '../../model/stakeholder';
import {StakeholderFormComponent} from '../../stakeholder-form/stakeholder-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Survey} from '../../model/survey';
import {SurveyService} from '../../services/survey.service';
import {JSGroupStakeholder} from '../../JsonModel/jsgroup-stakeholder';
import {forEach} from '@angular/router/src/utils/collection';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-send-survey',
  templateUrl: './send-survey.component.html',
  styleUrls: ['./send-survey.component.scss']
})

export class SendSurveyComponent implements OnInit {
  showModal: boolean;
  stakeholders: Stakeholder[] = [];
  groupStakeholder: GroupStakeholder[] = [];
  survey: Survey;
  surveys: Survey[] = [];
  selectedGroup: GroupStakeholder[] = [];
  groups: JSGroupStakeholder[] = [];
  checkAll = false;

  constructor(private stakeholderService: StakeholderService, private modalService: NgbModal, private surveyServiec: SurveyService, private spinner: NgxSpinnerService){ }

  ngOnInit() {
    this.stakeholderService.getGroupStakeholdersAndStakeholders().subscribe( data => {
      this.groups = data;
    });
    this.stakeholderService.getSurveys().subscribe( data => {
      this.surveys = data;
    });
  }

  hide() {
    this.showModal = false;
  }

  selectStakeholders(group: JSGroupStakeholder) {
    this.stakeholders = group.stakeholders;
    this.stakeholders.forEach( (stakeholder: Stakeholder) => {
      stakeholder.isSelected = group.isChecked;
    });
    this.showModal = true;
  }

  edit(stakeholder: Stakeholder) {
    const modalRef = this.modalService.open(StakeholderFormComponent, { centered: true });
    modalRef.componentInstance.stakeholder = stakeholder;
    modalRef.componentInstance.title = 'Edit The Information';
    modalRef.result.then( result => {
      const index = this.stakeholders.indexOf(stakeholder);
      this.stakeholders[index] = result;
    });
  }

  sendSurvey() {
    this.spinner.show();
    const stakeholders: Stakeholder[] = [];
    this.groups.filter( group => {
      return group.isChecked === true;
    }).forEach( group => {
      group.stakeholders.filter( x =>  x.isSelected === true).forEach( stakeholder => stakeholders.push(stakeholder));
    });
    this.surveyServiec.sendSurveyToSelectedGroup(this.survey, stakeholders).subscribe( result => {
      if (result) {
        alert('Survey has been sent.');
      } else {
        alert('Sending Service has been failured');
      }
      this.spinner.hide();
    });
  }

  toggleVisibility(group: JSGroupStakeholder) {
      group.stakeholders.forEach( stakeholder => stakeholder.isSelected = group.isChecked);
  }

  selectedAll() {
    this.groups.forEach( group => {
      group.isChecked = this.checkAll;
      group.stakeholders.forEach( stakeholder => stakeholder.isSelected = this.checkAll);
    });
  }
}
