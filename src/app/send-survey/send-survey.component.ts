import { Component, OnInit } from '@angular/core';
import {GroupStakeholder} from '../model/group-stakeholder';
import {StakeholderService} from '../services/stakeholder.service';
import {Stakeholder} from '../model/stakeholder';
import {StakeholderFormComponent} from '../stakeholder-form/stakeholder-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Survey} from '../model/survey';

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
  constructor(private stakeholderService: StakeholderService, private modalService: NgbModal) { }

  ngOnInit() {
    this.stakeholderService.getGroupStakeholders().subscribe( data => {
      this.groupStakeholder = data;
    });
    this.stakeholderService.getSurveys().subscribe( data => {
      this.surveys = data;
    });
  }

  hide() {
    this.showModal = false;
  }

  selectStakeholders(group: GroupStakeholder) {
    this.stakeholderService.getStakeholdersByGroup(group.id).subscribe( data => {
      this.stakeholders = data;
      this.showModal = true;
    });
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

  nextToSurveySelection() {

  }
}
