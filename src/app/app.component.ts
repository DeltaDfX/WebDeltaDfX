import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavbarService} from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Home page';

  constructor(private router: Router, public nav: NavbarService) {}

  ngOnInit(): void {
  }

    userLogout() {
        sessionStorage.removeItem('token');
        this.router.navigate(['login']);
    }
}
