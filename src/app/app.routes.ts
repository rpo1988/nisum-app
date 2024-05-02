import { Routes } from '@angular/router';
import { userResolver } from './users/user.resolver';

export enum RoutePath {
  LIST = '',
  EDIT = 'edit/:id',
}

export const routes: Routes = [
  {
    path: RoutePath.LIST,
    loadComponent: () => import('./users/user-list/user-list.component').then((mod) => mod.UserListComponent)
  },
  {
    path: RoutePath.EDIT,
    loadComponent: () => import('./users/user-edition/user-edition.component').then((mod) => mod.UserEditionComponent),
    resolve: {
      user: userResolver
    }
  },
  { path: '**', redirectTo: RoutePath.LIST, pathMatch: 'full' },
];
