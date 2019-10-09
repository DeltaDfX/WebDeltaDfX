import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/user.service';
import {FormBuilder} from '@angular/forms';
import {NavbarService} from '../../../services/navbar.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {RegisterComponent} from '../../register/register.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  email: string;
  password: string;
  loginError;
  isRemember = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private userService: UserService,
              private formBuilder: FormBuilder, private nav: NavbarService,
              private spinner: NgxSpinnerService) {
    nav.hide();
  }

  ngOnInit() {
  }

  loginOnClick() {
    this.spinner.show();
    this.spinner.hide();
  }
}
