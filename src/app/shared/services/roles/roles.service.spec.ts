import {inject, TestBed} from '@angular/core/testing';

import {RolesService} from './roles.service';
import {StoreModule} from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {authReducer} from '@app/auth/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

xdescribe('RolesService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [StoreModule.forRoot({
            'core:auth:constantine': authReducer
        })],
    providers: [RolesService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });
  it('should be created', inject([RolesService], (service: RolesService) => {
      expect(service).toBeTruthy();
    })
  );
});
