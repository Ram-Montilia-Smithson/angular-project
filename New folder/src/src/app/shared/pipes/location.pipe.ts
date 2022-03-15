import { Pipe, PipeTransform } from '@angular/core';

export declare type LocationFormats = 'c-d' | 'c-d-s';

@Pipe({
  name: 'location',
})
export class LocationPipe implements PipeTransform {
  constructor() {}

  transform(value: Location, format?: string): string {
    let location = '';

    const entries = Object.entries(value);

    const locationPrefixMap: { [x: string]: string } = {
      district: 'מחוז',
      street: 'רחוב',
    };

    location = entries
      .map(([key, value]) => {
        return value !== undefined
          ? [locationPrefixMap[key], value].join(' ')
          : null;
      })
      .filter((item) => item !== null)
      .join(', ');

    return location;
  }
}
