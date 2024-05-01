import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../../users/users';
import { capitalizeText } from '../utils/formatter';

@Pipe({
  name: 'fullname',
  standalone: true,
})
export class FullnamePipe implements PipeTransform {
  transform(value: Pick<User, 'name'>): string {
    return value?.name
      ? [value.name.first, value.name.last].reduce((acc, current) => {
          return current
            ? `${acc ? acc + ' ' : ''}${capitalizeText(current)}`
            : acc;
        }, '')
      : '';
  }
}
