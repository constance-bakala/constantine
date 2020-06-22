import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@shared/services/translate.service';
import * as _ from 'lodash';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {
  }

  transform(key: any): any {
    return _.get(this.translate.data, key);
  }
}
