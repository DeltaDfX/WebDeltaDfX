import { Component, OnInit } from '@angular/core';
import {RegisterComponent} from '../register/register.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavbarService} from '../services/navbar.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  register: RegisterComponent;
  loginForm: FormGroup;
  email;
  password;
  loginError;
  isRemember = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private userService: UserService,
              private formBuilder: FormBuilder, private nav: NavbarService) {
    this.loginForm = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    nav.hide();
  }

  ngOnInit() {
  }

  loginOnClick(data) {
    if (this.loginForm.invalid) {
      this.loginError = 'Email is not valid';
    }
    this.userService.getAuthentication(data.email, data.password).subscribe( stakeholder => {
      if (stakeholder != null) {
        if (this.isRemember) {
          sessionStorage.setItem(
              'token',
              btoa(data.email + ':' + data.password)
          );
        }
        localStorage.setItem('currentUser', JSON.stringify(stakeholder));
        this.router.navigate(['home']);
        return true;
      } else {
        this.loginError = 'The email/password is not correct';
      }
    });
  }

  openRegister() {
    const modalRef = this.modalService.open(RegisterComponent);
  }

}
