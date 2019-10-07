import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegisterComponent} from '../../register/register.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavbarService} from '../../services/navbar.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  register: RegisterComponent;
  email: string;
  password: string;
  loginError;
  isRemember = false;
  @Output() public returnAfterLogon = new EventEmitter<any>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private userService: UserService,
              private formBuilder: FormBuilder, private nav: NavbarService,
              private spinner: NgxSpinnerService,
              private app: AppComponent) {
    nav.hide();
    if (sessionStorage.getItem('token') != null) {
      this.router.navigate(['home-page']);
    }
  }

  ngOnInit() {
  }

  loginOnClick() {
    this.spinner.show();
    this.userService.getAuthentication(this.email, this.password).subscribe(stakeholder => {
      this.spinner.hide();
      if (stakeholder != null) {
        sessionStorage.clear();
        localStorage.clear();
        const json = {
          email: this.email,
          password: this.password
        };
        const stringToken = btoa(JSON.stringify(json));
        if (this.isRemember) {
          sessionStorage.setItem(
            'token',
            stringToken
          );
        }
        this.userService.setToken(JSON.stringify(stakeholder), stringToken);
        this.app.changeUserStatus();
        this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('redirectUrl'));
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
