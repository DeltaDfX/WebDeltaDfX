import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUrl = route['routerState']['url'];

    if (localStorage.getItem('currentUser') != null) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );
    return false;
  }

}
