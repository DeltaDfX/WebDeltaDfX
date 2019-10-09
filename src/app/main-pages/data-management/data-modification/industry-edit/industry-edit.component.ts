import { Component, OnInit } from '@angular/core';
import {Industry} from '../../../../model/industry';
import {StakeholderService} from '../../../../services/stakeholder.service';

@Component({
  selector: 'app-industry-edit',
  templateUrl: './industry-edit.component.html',
  styleUrls: ['./industry-edit.component.scss']
})
export class IndustryEditComponent implements OnInit {
  industries: Industry[] = [];
  constructor(private stakeholderService: StakeholderService) { }

  ngOnInit() {
    this.stakeholderService.getIndustries().subscribe( (industries: Industry[]) => {
      this.industries = industries;
    });
  }

  editSurvey(industry: Industry) {

  }

  deleteSurvey(industry: Industry) {

  }
}
