import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../services/user.service';
import {FormBuilder} from '@angular/forms';
import {NavbarService} from '../../services/navbar.service';
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
    this.userService.authenticateAdmin(this.email, this.password).subscribe(token => {
      if (token != null) {
        sessionStorage.clear();
        localStorage.clear();
        if (this.isRemember) {
          sessionStorage.setItem(
            'token',
            btoa(`{${this.email} + ':' + ${this.password}`)
          );
        }
        this.userService.setToken(JSON.stringify(token));
        this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('redirectUrl'));
        return true;
      } else {
        this.loginError = 'The email/password is not correct';
      }
      this.spinner.hide();
    });
  }
}
