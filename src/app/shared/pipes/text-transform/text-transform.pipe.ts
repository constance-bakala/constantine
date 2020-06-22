import {Pipe, PipeTransform} from '@angular/core';
import {TransformTypeEnum} from '@shared/directives/text-transform/TransformTypeEnum';

@Pipe({
  name: 'textTransform'
})
export class TextTransformPipe implements PipeTransform {
  static transformText(value: string, type: string = ''): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    switch (type) {
      case TransformTypeEnum.UPPERCASE:
        return value.toUpperCase();
      case TransformTypeEnum.LOWERCASE:
        return value.toLowerCase();
      case TransformTypeEnum.CAPITALIZE:
        return value
          .toLowerCase()
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      default:
        const v = value.slice(1);
        return value.charAt(0).toUpperCase() + (v ? v.toLowerCase() : '');
    }
  }

  transform(value: string, type: string = ''): any {
    return TextTransformPipe.transformText(value, type);
  }
}
