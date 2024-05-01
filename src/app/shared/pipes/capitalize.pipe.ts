import { Pipe, PipeTransform } from '@angular/core';

import { capitalizeText } from '../utils/formatter';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return capitalizeText(value);
  }
}
