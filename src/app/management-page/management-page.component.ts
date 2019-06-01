import { Component, OnInit } from '@angular/core';
import { faTachometerAlt, faAddressCard, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {ListStakeholderComponent} from '../list-stakeholder/list-stakeholder.component';

export enum ContentOfView {
  ListStakeholer,
  SendSurvey,
  ShowChart
}

@Component({
  selector: 'app-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss']
})
export class ManagementPageComponent implements OnInit {
  faTachometerAlt = faTachometerAlt;
  contentOfView;
  checkType = ContentOfView;
  constructor() { }

  ngOnInit() {
  }

  sideBarClicked(contentOfView: ContentOfView) {
    this.contentOfView = contentOfView;
  }
}
