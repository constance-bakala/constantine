import {inject, TestBed} from '@angular/core/testing';

import {CacheService} from './cache.service';

xdescribe('CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService]
    });
  });

  it(
    'should be created',
    inject([CacheService], (service: CacheService) => {
      expect(service).toBeTruthy();
    })
  );
});