import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {IdentityService} from '../services/identity.service';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(private _identity: IdentityService,
              private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const profile = this._identity.fullProfile;

    if (!profile) {
      return of(true);
    } else {
      this._router.navigate(['todos']);
      return of(false);
    }
    return of(true);
  }

}
