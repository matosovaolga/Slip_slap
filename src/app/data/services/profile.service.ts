import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { IProfile } from '../interfaces/profile.interface';
import { BASE_API_URL } from '../../helpers/constants/constants';
import { IPageble } from '../interfaces/pageble.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);

  //   me: IProfile  = signal<IProfile>({} as IProfile);

  me = signal<IProfile | null>(null);
  constructor() {}

  getTestsAccounts() {
    return this.http.get<IProfile[]>(`${BASE_API_URL}account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<IProfile>(`${BASE_API_URL}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getAccount(id: string) {
    return this.http.get<IProfile>(`${BASE_API_URL}account/${id}`);
  }

  patchProfile(profile: Partial<IProfile>) {
    return this.http.patch<IProfile>(`${BASE_API_URL}account/me`, profile);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<IProfile>(`${BASE_API_URL}account/upload_image`, fd);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http
      .get<IPageble<IProfile>>(`${BASE_API_URL}account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  subscribeAccount(id: number) {
	   return this.http.post(`${BASE_API_URL}account/subscribe/${id}`, '');
  }
}
