import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { LOCALE_ID, Inject } from '@angular/core';

@Pipe({
  name: 'currencypipe',
  standalone: true
})
export class CurrencypipePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(value: number | null | undefined): string | null {
    if (value === null || value === undefined) {
      return null;
    }
    
    return formatCurrency(value, this.locale, 'Ft', 'HUF', '1.0-0');
  }

}
