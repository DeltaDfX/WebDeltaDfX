import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import {Router, RouterStateSnapshot} from '@angular/router';
import {NavbarService} from './services/navbar.service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Home page';
  @Input() isLogon;

  constructor(private router: Router, public nav: NavbarService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.changeUserStatus();
  }

  userLogout() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  }

  userLogin() {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    const redirectUrl = snapshot['url'];
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );
  }

  changeUserStatus() {
    if (!this.userService.isLogged()) {
      this.router.navigate(['home-page']);
      this.isLogon = false;
    } else {
      this.isLogon = true;
    }
  }
}
