import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattime'
})
export class FormattimePipe implements PipeTransform {

  transform(time: any, ...args: any[]): any {
    const currentTimeMinutes = Math.trunc(time / 60);
    const currentTimeMinutesFormatted = currentTimeMinutes < 10
        ? String(currentTimeMinutes).padStart(2, '0')
        : currentTimeMinutes;
    const currentTimeSeconds = Math.trunc(time % 60);
    const currentTimeSecondsFormatted = currentTimeSeconds < 10
        ? String(currentTimeSeconds).padStart(2, '0')
        : currentTimeSeconds;

    return `${currentTimeMinutesFormatted}:${currentTimeSecondsFormatted}`;
  }

}
