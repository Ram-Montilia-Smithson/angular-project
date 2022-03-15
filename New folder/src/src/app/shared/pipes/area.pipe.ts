import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'area',
})
export class AreaPipe implements PipeTransform {
  transform(value: number, tag?: string): string {

    tag = tag || 'מ"ר';

    return `${value} ${tag}`;
  }
}
