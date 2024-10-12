import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProfile } from '../interfaces/profile.interface';
import { BASE_API_URL } from '../../helpers/constants/constants';
import { IPageble } from '../interfaces/pageble.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);

  constructor() {}

  getTestsAccounts() {
    return this.http.get<IProfile[]>(`${BASE_API_URL}account/test_accounts`);
  }

  getMe() {
    return this.http.get<IProfile>(`${BASE_API_URL}account/me`);
  }

  getSubscribersShortList() {
	    return this.http.get<IPageble<IProfile>>(
        `${BASE_API_URL}account/subscribers`
      );
  }
}
