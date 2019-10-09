import {Component, Injectable, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {NavbarService} from '../../../services/navbar.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, public nav: NavbarService) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['admin/login']);
  }

  userLogout() {
    this.userService.removeToken();
  }
}
