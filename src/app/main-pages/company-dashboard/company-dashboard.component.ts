import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../services/navbar.service';
import {ActivatedRoute} from '@angular/router';

export enum ContentOfView {
  LocationAndIndustry = 'Location And Industry',
  StakeholderIssues = 'Stakeholder Issues',
}

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  contentOfView: ContentOfView;
  view = ContentOfView;

  constructor(private nav: NavbarService, private activateRoute: ActivatedRoute) {
    nav.show();
  }

  ngOnInit() {
  }

  sideBarClicked(contentOfView: ContentOfView) {
    this.contentOfView = contentOfView;
  }
}
