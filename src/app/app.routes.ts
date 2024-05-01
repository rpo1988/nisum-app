import { Routes } from '@angular/router';

export enum RoutePath {
  LIST = ''
}

export const routes: Routes = [
  {
    path: RoutePath.LIST,
    loadComponent: () => import('./users/user-list/user-list.component').then((mod) => mod.UserListComponent)
  },
  { path: '**', redirectTo: RoutePath.LIST, pathMatch: 'full' },
];
