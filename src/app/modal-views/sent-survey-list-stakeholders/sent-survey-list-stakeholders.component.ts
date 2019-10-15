import {Component, Input, OnInit} from '@angular/core';
import {Stakeholder} from '../../model/stakeholder';
import {StakeholderFormComponent} from '../stakeholder-form/stakeholder-form.component';
import {StakeholderService} from '../../services/stakeholder.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-sent-survey-list-stakeholders',
  templateUrl: './sent-survey-list-stakeholders.component.html',
  styleUrls: ['./sent-survey-list-stakeholders.component.scss']
})
export class SentSurveyListStakeholdersComponent implements OnInit {
  @Input() stakeholders: Stakeholder[] = [];

  constructor(private stakeholderService: StakeholderService, private modalService: NgbModal, private spinner: NgxSpinnerService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  hide() {
    this.activeModal.close();
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
}
