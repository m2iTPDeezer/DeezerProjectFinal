import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pourcentage'
})
export class PourcentagePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value+"%";
  }

}
