import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../services/navbar.service';
import {ActivatedRoute} from '@angular/router';
import {ContentOfView} from '../dashboard/company-dashboard/company-dashboard.component';

@Component({
  selector: 'app-company-training',
  templateUrl: './company-training.component.html',
  styleUrls: ['./company-training.component.scss']
})
export class CompanyTrainingComponent implements OnInit {

  constructor(private nav: NavbarService, private activateRoute: ActivatedRoute) {
    nav.show();
  }

  ngOnInit() {
  }

}
