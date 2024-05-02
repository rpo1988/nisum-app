import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { User } from './users';
import { UsersService } from './users.service';

export const userResolver: ResolveFn<User | null> = (route, state) => {
  return inject(UsersService).getUserById(route.params['id']);
};
