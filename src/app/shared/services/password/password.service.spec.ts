import {inject, TestBed} from '@angular/core/testing';

import {PasswordService} from './password.service';
import {APP_PASSWORD_CONFIG} from '@shared/services';

xdescribe('PasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordService, {provide: APP_PASSWORD_CONFIG, useValue: {}}]
    });
  });

  it(
    'should be created',
    inject([PasswordService], (service: PasswordService) => {
      expect(service).toBeTruthy();
    })
  );
});
