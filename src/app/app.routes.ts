import { Routes } from '@angular/router';
import { userResolver } from './users/user.resolver';

export enum RoutePath {
  LIST = '',
  CREATE = 'create',
  EDIT = 'edit/:id',
}

export const routes: Routes = [
  {
    path: RoutePath.LIST,
    loadComponent: () =>
      import('./users/user-list/user-list.component').then(
        (mod) => mod.UserListComponent
      ),
  },
  {
    path: RoutePath.CREATE,
    loadComponent: () =>
      import('./users/user-edition/user-edition.component').then(
        (mod) => mod.UserEditionComponent
      ),
  },
  {
    path: RoutePath.EDIT,
    loadComponent: () =>
      import('./users/user-edition/user-edition.component').then(
        (mod) => mod.UserEditionComponent
      ),
    resolve: {
      user: userResolver,
    },
  },
  { path: '**', redirectTo: RoutePath.LIST, pathMatch: 'full' },
];
