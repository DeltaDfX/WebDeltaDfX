import {Component, OnInit} from '@angular/core';
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
    email: string;
    password: string;
    loginError;
    isRemember = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private userService: UserService,
                private formBuilder: FormBuilder, private nav: NavbarService) {
        nav.hide();
        if (sessionStorage.getItem('token') != null) {
            this.router.navigate(['home']);
        }
    }

    ngOnInit() {
    }

    loginOnClick() {
        this.userService.getAuthentication(this.email, this.password).subscribe(stakeholder => {
            if (stakeholder != null) {
                sessionStorage.clear();
                localStorage.clear();
                if (this.isRemember) {
                    sessionStorage.setItem(
                        'token',
                        btoa(`{${this.email} + ':' + ${this.password}`)
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
