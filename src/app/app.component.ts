import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, first } from 'rxjs';

import { LocalStorageKey } from './shared/services/local-storage';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        first()
      )
      .subscribe((event) => {
        const resetCache = (event as NavigationEnd).url.includes(
          'resetCache=true'
        );
        if (resetCache) {
          this._localStorageService.removeItem(LocalStorageKey.USERS);
          this._router.navigate([], {
            queryParams: {
              resetCache: null,
            },
            queryParamsHandling: 'merge',
          });
        }
      });
  }
}
