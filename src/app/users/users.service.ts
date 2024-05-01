import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { LocalStorageKey } from '../shared/services/local-storage';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { User, UsersResponse } from './users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _url: string =
    'https://randomuser.me/api?seed=rpo-nisum&results=100&page=1&exc=registered';

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  getUsers(force: boolean): Observable<User[] | null> {
    if (force) {
      return this._http.get<UsersResponse>(this._url).pipe(
        map((response) => {
          this._localStorageService.setItem(
            LocalStorageKey.USERS,
            response.results
          );
          return response.results;
        })
      );
    }

    return of(this._localStorageService.getItem<User[]>(LocalStorageKey.USERS));
  }
}
