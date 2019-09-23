import { Component, OnInit } from '@angular/core';
import { faTachometerAlt, faAddressCard, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {ListStakeholderComponent} from '../../list-stakeholder/list-stakeholder.component';
import {NavbarService} from '../../services/navbar.service';
import {Router} from '@angular/router';
import {StakeholderService} from '../../services/stakeholder.service';

export enum ContentOfView {
  OrganisationInfo = 'Organisation information',
  StakeholderGroups = 'Stakeholder groups',
  SurveyManagement = 'Survey Management',
  CreateSurvey = 'Create a survey',
  SendSurvey = 'Send a survey',
  Upload = 'Upload'
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
  constructor(private nav: NavbarService, private router: Router, private stakeholderService: StakeholderService) {
    if (localStorage.getItem('currentUser') == null) {this.router.navigate(['login']); }
    nav.show();
  }

  ngOnInit() {
  }

  sideBarClicked(contentOfView: ContentOfView) {
    this.contentOfView = contentOfView;
  }

  downloadTemplate() {
    this.stakeholderService.downloadTemplateStakeholder().subscribe( x => {
      const blob = new Blob([x], {type: 'application/ms-excel'});
      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'template.xlsx';
      link.click();
    });
  }
}
