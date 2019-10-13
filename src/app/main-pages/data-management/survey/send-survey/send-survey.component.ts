import {Component, OnInit} from '@angular/core';
import {GroupStakeholder} from '../../../../model/group-stakeholder';
import {StakeholderService} from '../../../../services/stakeholder.service';
import {Stakeholder} from '../../../../model/stakeholder';
import {StakeholderFormComponent} from '../../../../modal-views/stakeholder-form/stakeholder-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Survey} from '../../../../model/survey';
import {SurveyService} from '../../../../services/survey.service';
import {JSGroupStakeholder} from '../../../../response-model/jsgroup-stakeholder';
import {NgxSpinnerService} from 'ngx-spinner';

export enum GroupType {
  Manager = 'Manager',
  Employee = 'Employee'
}

@Component({
  selector: 'app-send-survey',
  templateUrl: './send-survey.component.html',
  styleUrls: ['./send-survey.component.scss']
})

export class SendSurveyComponent implements OnInit {
  showModal: boolean;
  managerStakeholders: Stakeholder[] = [];
  employeeStakeholders: Stakeholder[] = [];
  groupStakeholder: GroupStakeholder[] = [];
  surveyManager: Survey;
  surveyEmployee: Survey;
  surveys: Survey[] = [];
  groups: JSGroupStakeholder[] = [];
  groupType = GroupType;
  stakeholders: Stakeholder[] = [];
  isSelectedGroup: GroupType;

  constructor(private stakeholderService: StakeholderService, private modalService: NgbModal, private surveyService: SurveyService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.surveyService.getSurveys().subscribe(data => {
      this.surveys = data;
    });
    this.stakeholderService.getGroupStakeholdersAndStakeholders().subscribe(data => {
      this.groups = data;
      // Get list managers
      this.managerStakeholders = this.groups.filter( group => {
        return group.name === GroupType.Manager;
      })[0].stakeholders;
      this.managerStakeholders.forEach((stakeholder: Stakeholder) => {
        stakeholder.isSelected = true;
      });
      // Get list employees
      this.employeeStakeholders = this.groups.filter( group => {
        return group.name === GroupType.Employee;
      })[0].stakeholders;
      this.employeeStakeholders.forEach((stakeholder: Stakeholder) => {
        stakeholder.isSelected = true;
      });
    });
  }

  hide() {
    this.showModal = false;
  }


  manualEntry(grouptype: GroupType) {
    this.isSelectedGroup = grouptype;
    const modalRef = this.modalService.open(StakeholderFormComponent, {centered: true});
    modalRef.componentInstance.title = 'Add New Stakeholder';
    modalRef.componentInstance.groupType = grouptype;
    modalRef.result.then(result => {
      if (grouptype === GroupType.Manager) {
        this.managerStakeholders.push(result);
      } else {
        this.employeeStakeholders.push(result);
      }
    });
  }

  viewList(grouptype) {
    this.isSelectedGroup = grouptype;
    if (grouptype === GroupType.Manager) {
      this.stakeholders = this.managerStakeholders;
    } else {
      this.stakeholders = this.employeeStakeholders;
    }
    this.showModal = true;

  }

  edit(stakeholder: Stakeholder) {
    const modalRef = this.modalService.open(StakeholderFormComponent, {centered: true});
    modalRef.componentInstance.stakeholder = stakeholder;
    modalRef.componentInstance.title = 'Edit The Information';
    modalRef.result.then(result => {
      const index = this.stakeholders.indexOf(stakeholder);
      this.stakeholders[index] = result;
    });
  }

  sendSurvey(groupType: GroupType) {
    this.spinner.show();
    const stakeholders: Stakeholder[] = [];
    let survey: Survey;
    /*this.groups.filter(group => {
      return group.isChecked === true;
    }).forEach(group => {
      group.stakeholders.filter(x => x.isSelected === true).forEach(stakeholder => stakeholders.push(stakeholder));
    });*/
    if (groupType === GroupType.Manager) {
      this.managerStakeholders.filter(x => x.isSelected === true).forEach(stakeholder => stakeholders.push(stakeholder));
      survey = this.surveyManager;
    } else {
      this.employeeStakeholders.filter(x => x.isSelected === true).forEach(stakeholder => stakeholders.push(stakeholder));
      survey = this.surveyEmployee;
    }
    this.surveyService.sendSurveyToSelectedGroup(survey, stakeholders).subscribe(result => {
      if (result) {
        alert('Survey has been sent.');
      } else {
        alert('Sending Service has been failured');
      }
      this.spinner.hide();
    });
  }
}
