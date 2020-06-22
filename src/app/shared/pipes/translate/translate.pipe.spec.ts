import {inject} from '@angular/core/testing';
import {TranslateService} from '@shared/services/translate.service';

xdescribe('TranslatePipe', () => {

  it(
    'should be created',
    inject([TranslateService], (service: TranslateService) => {
      expect(service).toBeTruthy();
    })
  );
});
