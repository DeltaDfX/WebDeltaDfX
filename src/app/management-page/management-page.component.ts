import { Component, OnInit } from '@angular/core';
import { faTachometerAlt, faAddressCard, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {ListStakeholderComponent} from '../list-stakeholder/list-stakeholder.component';
import {NavbarService} from '../services/navbar.service';
import {Router} from '@angular/router';

export enum ContentOfView {
  ListStakeholer,
  SendSurvey,
  Overview
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
  constructor(private nav: NavbarService, private router: Router) {
    if (localStorage.getItem('currentUser') == null) {this.router.navigate(['login']); }
    nav.show();
  }

  ngOnInit() {
  }

  sideBarClicked(contentOfView: ContentOfView) {
    this.contentOfView = contentOfView;
  }
}
