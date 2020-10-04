import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser, IUserResponse} from '../../models/models';
import {IdentityService} from '../../services/identity.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(private _identity: IdentityService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(14)]),
      address: new FormGroup({
        street: new FormControl(),
        suite: new FormControl(),
        city: new FormControl(),
        zipcode: new FormControl(),
      })
    });
  }

  handleRegister() {
    const params: IUser = this.form.value;
    this._identity.registerUser(params)
      .subscribe(
        (user: IUserResponse) => {
          this._identity.profile = user;
          this._router.navigate(['todos']);
        },
        (error) => console.error(error)
      );
  }
}
