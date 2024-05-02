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
    'https://randomuser.me/api?seed=rpo-nisum&results=100&page=1&inc=gender,name,email,dob,cell,login';

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  getUsers(): Observable<User[] | null> {
    const previous = this._localStorageService.getItem<User[]>(
      LocalStorageKey.USERS
    );
    if (!previous) {
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

    return of(previous);
  }

  getUserById(uuid: string): Observable<User | null> {
    return this.getUsers().pipe(
      map((users) => users?.find((user) => user.login?.uuid === uuid) || null)
    );
  }

  deleteUser(uuid: string): Observable<User | null> {
    const users = this._localStorageService.getItem<User[]>(
      LocalStorageKey.USERS
    );
    const userIndex = users?.findIndex((user) => user.login?.uuid === uuid);
    let removedUser: User | null = null;
    if (users && typeof userIndex === 'number' && userIndex > -1) {
      removedUser = users.splice(userIndex, 1)[0];
      this._localStorageService.setItem(LocalStorageKey.USERS, users);
    }
    return of(removedUser);
  }

  updateUser(updatedUser: User): Observable<User | null> {
    const users = this._localStorageService.getItem<User[]>(
      LocalStorageKey.USERS
    );
    if (!updatedUser.login?.uuid) {
      users!.unshift({
        ...updatedUser,
        login: {
          uuid: `custom-${Date.now()}`,
        },
      });
    } else {
      const userIndex = users?.findIndex(
        (user) => user.login?.uuid === updatedUser.login?.uuid
      );
      if (typeof userIndex === 'number' && userIndex > -1) {
        users![userIndex] = updatedUser;
      }
    }
    this._localStorageService.setItem(LocalStorageKey.USERS, users);
    return of(updatedUser);
  }
}
