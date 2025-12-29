import {inject, TestBed} from '@angular/core/testing';

import {PermissionService} from '@shared/services';
import {StoreModule} from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

xdescribe('PermissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [StoreModule.forRoot({})],
    providers: [PermissionService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it(
    'should be created',
    inject([PermissionService], (service: PermissionService) => {
      expect(service).toBeTruthy();
    })
  );
});
