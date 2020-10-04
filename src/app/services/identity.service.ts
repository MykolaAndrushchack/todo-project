import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUserResponse} from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class IdentityService {
  private _apiUrl = environment.apiUrl;
  private _profile: IUserResponse;

  get fullProfile() {
    return this._profile;
  }

  set profile(profile: IUserResponse) {
    this._profile = profile;
  }

  constructor(private _http: HttpClient) {
  }

  registerUser(params) {
    return this._http.post(`${this._apiUrl}/users`, params);
  }
}
