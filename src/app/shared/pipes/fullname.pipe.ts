import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../../users/users';

@Pipe({
  name: 'fullname',
  standalone: true,
})
export class FullnamePipe implements PipeTransform {
  transform(value: Pick<User, 'name'>): string {
    return value?.name ? `${value.name.first} ${value.name.last}` : '';
  }
}
