import { Pipe, PipeTransform } from '@angular/core';
import {IRegExpPattern} from '@shared/interfaces/pattern.interfaces';

@Pipe({
  name: 'patternTransform'
})
export class PatternTransformPipe implements PipeTransform {

  static transformText(value: string, type: string = ''): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    switch (type) {
      case IRegExpPattern.NUMERIC:
        return value.replace(/[^0-9]/, '');
      case IRegExpPattern.ALPHANUMERIC:
        return value.replace(/[^a-zA-Z0-9]/, '');
      case IRegExpPattern.POSTAL_CODE:
        return value.replace(/^[0-9]{5,5}/, '');
      case IRegExpPattern.PHONE_NUMBER:
        return value.replace(/^(\d\d\s){4}(\d\d)/, '');
      case IRegExpPattern.EMAIL:
        return value.replace(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}/, '');
      default:
        return value;
    }
  }

  transform(value: string, type: string = ''): any {
    return PatternTransformPipe.transformText(value, type);
  }

}
