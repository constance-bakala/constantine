import {inject, TestBed} from '@angular/core/testing';

import {LocalStorageService} from './local-storage.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

xdescribe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  it(
    'should be created',
    inject([LocalStorageService], (service: LocalStorageService) => {
      expect(service).toBeTruthy();
    })
  );
});
