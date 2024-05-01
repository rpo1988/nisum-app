import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem<T>(key: string): T | null {
    try {
      return JSON.parse(localStorage.getItem(key) as string) as T;
    } catch (error) {
      return null;
    }
  }

  setItem(key: string, value: unknown): void {
    return localStorage.setItem(key, JSON.stringify(value));
  }
}
