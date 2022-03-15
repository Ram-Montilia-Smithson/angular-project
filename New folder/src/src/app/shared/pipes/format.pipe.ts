import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { AreaPipe } from './area.pipe';
import { formatDate, formatNumber, formatCurrency } from '@angular/common';
import { PrefixPipe } from './prefix.pipe';
import { LocationPipe } from './location.pipe';

@Pipe({
  name: 'format',
})
export class FormatPipe implements PipeTransform {
  constructor(
    private area: AreaPipe,
    private prefix: PrefixPipe,
    private location: LocationPipe,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  private formatObj(value: any, format: string, args?: string): string {
    const formats = {
      location: this.location.transform(value),
      area: this.area.transform(value),
      prefix: this.prefix.transform(value, args),
      currency: formatCurrency(value, this.locale, '₪', 'ILS', '1.0'),
      number: formatNumber(value, this.locale),
    };
    return formats[format] !== undefined ? formats[format] : value;
  }

  private formatDate(value: any, format: string, args?: string): string {
    const name = value.constructor.name.toLowerCase();
    const formats = {
      time: formatDate(value, 'HH:mm', this.locale),
      date: formatDate(value, 'M/d/yy', this.locale),
      fullDate: formatDate(value, 'HH:mm M/d/yy', this.locale),
    };
    return name === 'date' && value.toString() !== 'Invalid Date'
      ? formats[format]
      : value;
  }

  private formatValue(value: unknown, format?: string, args?): unknown {
    const name = value?.constructor.name.toLowerCase();
    return name === 'date'
      ? this.formatDate(value, format, args)
      : this.formatObj(value, format, args);
  }

  public transform(value: unknown, format?: string, args?): unknown {
    return format && value ? this.formatValue(value, format, args) : value;
  }
}
