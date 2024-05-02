import { Injectable } from '@angular/core';

import { LocalStorageKey } from './local-storage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem<T>(key: LocalStorageKey): T | null {
    try {
      return JSON.parse(localStorage.getItem(key) as string) as T;
    } catch (error) {
      return null;
    }
  }

  setItem(key: LocalStorageKey, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }
}
