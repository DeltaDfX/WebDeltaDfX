import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavbarService} from './services/navbar.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Home page';
  isLogon = false;

  constructor(private router: Router, public nav: NavbarService) {
  }

  ngOnInit(): void {
  }

  userLogout() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  }

  userLogin() {
    this.router.navigate(['login']);
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['home-page']);
      this.isLogon = false;
    } else {
      this.isLogon = true;
    }
  }
}
