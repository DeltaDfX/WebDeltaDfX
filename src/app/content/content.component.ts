import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private router: Router, private nav: NavbarService) {
    if (localStorage.getItem('currentUser') == null) {this.router.navigate(['login']); }
    nav.show();
  }

  ngOnInit() {
  }

}
