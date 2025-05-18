import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { LOCALE_ID, Inject } from '@angular/core'; 


@Pipe({
  name: 'companycurrency'
})
export class CompanycurrencyPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {} 

  transform(value: any | null | undefined): string | null {

    if (value === null || value === undefined) return null;

    return formatCurrency(parseInt(value), this.locale, 'Ft', 'HUF', '1.0-0');
  } 
}
