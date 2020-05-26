import {inject, TestBed} from '@angular/core/testing';

import {PermissionService} from '@shared/services';
import {StoreModule} from '@ngrx/store';
import {HttpClientTestingModule} from '@angular/common/http/testing';

xdescribe('PermissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionService],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ]
    });
  });

  it(
    'should be created',
    inject([PermissionService], (service: PermissionService) => {
      expect(service).toBeTruthy();
    })
  );
});
